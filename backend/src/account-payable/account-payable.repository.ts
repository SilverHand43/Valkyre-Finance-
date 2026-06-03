import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountPayableRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(companyId: string, data: Prisma.AccountPayableUncheckedCreateInput) {
    return this.prisma.accountPayable.create({ data: { ...data, companyId } });
  }

  findAll(companyId: string) {
    return this.prisma.accountPayable.findMany({
      where: { companyId },
      include: { supplier: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(companyId: string, id: string) {
    return this.prisma.accountPayable.findFirst({ where: { companyId, id }, include: { supplier: true } });
  }

  update(id: string, data: Prisma.AccountPayableUpdateInput) {
    return this.prisma.accountPayable.update({ where: { id }, data });
  }

  delete(companyId: string, id: string) {
    return this.prisma.accountPayable.deleteMany({ where: { companyId, id } });
  }
}
