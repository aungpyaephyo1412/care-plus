import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { DtoTransformerService } from '../../util/dto-transformer.service';
import ErrorResponseService from '../../util/error-response.service';
import { Public } from '../auth/decorators/public.decorator';
import { UpdateUserDto, updateUserDtoSchema } from './dto/update-user.dto';
import { UsersQueryDto } from './dto/user-query.dto';
import { userDtoSchema } from './dto/user.dto';
import { usersDtoSchema } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly dtoTransformer: DtoTransformerService,
    private readonly errorResponse: ErrorResponseService,
  ) {}

  @Public()
  @Get()
  async findAll(@Query() query: UsersQueryDto) {
    const { q, page = 1, perPage = 50, sort } = query;
    const users = await this.usersService.findAll({
      page: page,
      perPage: perPage,
      ...(sort && { orderBy: sort }),
      where: {
        ...(q && {
          OR: [
            {
              name: {
                contains: q,
                mode: 'insensitive',
              },
            },
          ],
        }),
      },
    });
    return this.dtoTransformer.transform(usersDtoSchema, users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne({ where: { id } });
    return {
      data: this.dtoTransformer.transform(userDtoSchema, user),
    };
  }

  @Put(':id')
  async put(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserDtoSchema)) putDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update({
      where: { id },
      data: putDto,
    });
    return {
      message: 'User updated successfully',
      data: this.dtoTransformer.transform(userDtoSchema, user),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }
}
