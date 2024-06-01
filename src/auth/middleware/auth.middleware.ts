import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from '../service/auth.service';
import { Request as ExpressRequest } from 'express';

interface Request extends ExpressRequest {
  user: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = await this.authService.verifyToken(token);
      req.user = decoded.user;
    }
    next();
  }
}
