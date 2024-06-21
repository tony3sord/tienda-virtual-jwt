import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // Si no se requieren roles, permitir acceso
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Asume que el usuario está adjunto al request por un middleware de autenticación

    //verificar el campo 'role'
    return requiredRoles.includes(user.role);
  }
}
