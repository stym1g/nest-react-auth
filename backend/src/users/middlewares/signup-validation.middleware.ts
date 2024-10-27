import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SignupValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body;
    if (!email) {
        throw new BadRequestException('Email is required.');
      }

    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format.');
    }

    // Name validation
    if (!name || name.trim().length === 0) {
      throw new BadRequestException('Name is required.');
    }

    // Password validation
    if(!password){
        throw new BadRequestException('Password is required.');
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new BadRequestException('Password must be at least 8 characters long, contain at least one letter, one number, and one special character.');
    }

    next();
  }
}
