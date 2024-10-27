import { Injectable, NestMiddleware, BadRequestException, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SignupValidationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(SignupValidationMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body;
    this.logger.log('Validating signup request...');
    if (!email) {
      this.logger.warn('Email is required but not provided.');
        throw new BadRequestException('Email is required.');
      }

    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      this.logger.warn(`Invalid email: ${email}`);
      throw new BadRequestException('Invalid email format.');
    }

    // Name validation
    if (!name || name.trim().length === 0) {
      this.logger.warn('Name is required but not provided.');
      throw new BadRequestException('Name is required.');
    }

    // Password validation
    if(!password){
        this.logger.warn('Password is required but not provided.');
        throw new BadRequestException('Password is required.');
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      this.logger.warn('Invalid password format.');
      throw new BadRequestException('Password must be at least 8 characters long, contain at least one letter, one number, and one special character.');
    }
    this.logger.log('Signup request validated successfully.');
    
    next();
  }
}
