import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RequestUser } from '../interfaces/request-user.interface';

@Injectable()
export class CompanyIsolationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
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
