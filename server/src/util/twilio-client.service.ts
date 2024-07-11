import { Injectable } from '@nestjs/common';
import type { Twilio } from 'twilio';
import twilio from 'twilio';

@Injectable()
export class TwilioClientService {
  private readonly client: Twilio;
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }
  async sendSms(to: string, body: string): Promise<void> {
    try {
      await this.client.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
