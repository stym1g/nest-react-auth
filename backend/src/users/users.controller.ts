import { Body, Controller, Post, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './user.entity';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<Users> {
    this.logger.log('User signup initiated.');
    const user = await this.usersService.create(createUserDto);
    this.logger.log(`User created with ID: ${user.id}`);
    return user;
  }
}
