import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountReceivableRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(companyId: string, data: Prisma.AccountReceivableUncheckedCreateInput) {
    return this.prisma.accountReceivable.create({ data: { ...data, companyId } });
  }

  findAll(companyId: string) {
    return this.prisma.accountReceivable.findMany({
      where: { companyId },
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(companyId: string, id: string) {
    return this.prisma.accountReceivable.findFirst({ where: { companyId, id }, include: { customer: true } });
  }

  update(id: string, data: Prisma.AccountReceivableUpdateInput) {
    return this.prisma.accountReceivable.update({ where: { id }, data });
  }

  delete(companyId: string, id: string) {
    return this.prisma.accountReceivable.deleteMany({ where: { companyId, id } });
  }
}
