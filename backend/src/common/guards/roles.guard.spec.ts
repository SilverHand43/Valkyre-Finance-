import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  it('deve permitir quando role do usuario estiver autorizada', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue([UserRole.ADMIN]),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: UserRole.ADMIN } }),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('deve negar quando role nao estiver autorizada', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue([UserRole.OWNER]),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: UserRole.EMPLOYEE } }),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(false);
  });
});
