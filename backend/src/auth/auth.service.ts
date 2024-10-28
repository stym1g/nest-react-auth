import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    this.logger.log('Validating user');
    const user = await this.usersService.findByEmail(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      this.logger.log(`User ${user.name} validated successfully`);
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    this.logger.log(`Attempting to authenticate user ${email}`);
    const user = await this.validateUser(email, password);
    if (!user) {
      this.logger.error(`Failed login attempt for user ${email}`);
      throw new ForbiddenException('Invalid credentials');
    }
    const payload = { email: user.email };
    this.logger.log(`User ${user.email} authenticated successfully`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
