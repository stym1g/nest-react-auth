import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { email, name, password } = createUserDto;
    this.logger.log('Creating a new user...');
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.userRepository.create({
        email,
        name,
        password: hashedPassword,
      });

      return this.userRepository.save(user);
    } catch (error) {
      this.logger.error('Error creating user', error.stack);
      throw new InternalServerErrorException('Failed to create user.');
    }
  }

  async findByEmail(email: string): Promise<Users | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
