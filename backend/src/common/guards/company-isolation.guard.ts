import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../constants/auth.constants';
import { RequestUser } from '../interfaces/request-user.interface';

@Injectable()
export class CompanyIsolationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<{ user?: RequestUser; body?: { companyId?: string } }>();

    const user = request.user;
    if (!user?.companyId) {
      throw new ForbiddenException('Contexto de empresa não encontrado no token.');
    }

    if (
      request.body?.companyId &&
      request.body.companyId !== user.companyId
    ) {
      throw new ForbiddenException('Não é permitido acessar dados de outra empresa.');
    }

    return true;
  }
}
