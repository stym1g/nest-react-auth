import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() body: { email: string; password: string }) {
    this.logger.log('Received signin request');
    const token = await this.authService.login(body.email, body.password);
    this.logger.log(`User ${body.email} signed in successfully`);
    return token;
  }
}
