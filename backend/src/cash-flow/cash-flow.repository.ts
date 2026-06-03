import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CashFlowRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(companyId: string, userId: string, data: Prisma.CashFlowUncheckedCreateInput) {
    return this.prisma.cashFlow.create({
      data: {
        ...data,
        companyId,
        userId,
      },
    });
  }

  findAll(companyId: string) {
    return this.prisma.cashFlow.findMany({ where: { companyId }, orderBy: { date: 'desc' } });
  }

  findById(companyId: string, id: string) {
    return this.prisma.cashFlow.findFirst({ where: { companyId, id } });
  }

  update(id: string, data: Prisma.CashFlowUpdateInput) {
    return this.prisma.cashFlow.update({ where: { id }, data });
  }

  delete(companyId: string, id: string) {
    return this.prisma.cashFlow.deleteMany({ where: { companyId, id } });
  }
}
