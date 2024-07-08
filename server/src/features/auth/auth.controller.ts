import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { DtoTransformerService } from '../../util/dto-transformer.service';
import ErrorResponseService from '../../util/error-response.service';
import { PasswordService } from '../../util/password.service';
import {
  CreateUserDto,
  createUserDtoSchema,
} from '../users/dto/create-user.dto';
import { LoginUserDto, loginUserDtoSchema } from '../users/dto/login-user.dto';
import { userDtoSchema } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly dtoTransformer: DtoTransformerService,
    private readonly errorResponse: ErrorResponseService,
  ) {}

  @Public()
  @Post('register')
  async register(
    @Body(new ZodValidationPipe(createUserDtoSchema))
    createAuthDto: CreateUserDto,
  ) {
    try {
      const hashPassword = await this.passwordService.hash(
        createAuthDto.password,
      );

      const user = await this.authService.create({
        ...createAuthDto,
        password: hashPassword,
      });
      const authDto = this.dtoTransformer.transform(userDtoSchema, user);
      return {
        data: authDto,
        message: 'Register successful',
      };
    } catch (error) {
      this.errorResponse.handle(error);
    }
  }
  @Public()
  @Post('login')
  async login(
    @Body(new ZodValidationPipe(loginUserDtoSchema)) loginAuthDto: LoginUserDto,
  ) {
    const user = await this.authService.findOne({
      where: {
        phone: loginAuthDto.identifier,
      },
    });
    const isPasswordValid = await this.passwordService.validate(
      loginAuthDto.password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException({ message: 'Invalid credentials' });

    const authDto = this.dtoTransformer.transform(userDtoSchema, user);
    const jwt = await this.jwtService.signAsync(authDto);

    return { jwt, data: authDto };
  }
}
