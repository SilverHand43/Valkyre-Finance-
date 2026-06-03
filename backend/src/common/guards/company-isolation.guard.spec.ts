import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CompanyIsolationGuard } from './company-isolation.guard';

describe('CompanyIsolationGuard', () => {
  const reflector = {
    getAllAndOverride: jest.fn(),
  } as unknown as Reflector;

  const guard = new CompanyIsolationGuard(reflector);

  beforeEach(() => {
    jest.clearAllMocks();
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(false);
  });

  it('deve permitir rotas públicas', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(true);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({}),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('deve permitir quando companyId do body coincide com token', () => {
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({
          user: { companyId: 'company-1' },
          body: { companyId: 'company-1' },
        }),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('deve bloquear quando companyId do body for diferente', () => {
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({
          user: { companyId: 'company-1' },
          body: { companyId: 'company-2' },
        }),
      }),
    } as any;

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
