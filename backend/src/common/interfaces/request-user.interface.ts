import { UserRole } from '@prisma/client';

export interface RequestUser {
  sub: string;
  companyId: string;
  role: UserRole;
  email: string;
}
