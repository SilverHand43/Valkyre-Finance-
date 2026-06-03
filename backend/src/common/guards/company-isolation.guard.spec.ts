import { ForbiddenException } from '@nestjs/common';
import { CompanyIsolationGuard } from './company-isolation.guard';

describe('CompanyIsolationGuard', () => {
  const guard = new CompanyIsolationGuard();

  it('deve permitir quando companyId do body coincide com token', () => {
    const context = {
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
