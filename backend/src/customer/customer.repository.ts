import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(companyId: string, data: Prisma.CustomerUncheckedCreateInput) {
    return this.prisma.customer.create({
      data: { ...data, companyId },
    });
  }

  findAll(companyId: string) {
    return this.prisma.customer.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(companyId: string, id: string) {
    return this.prisma.customer.findFirst({ where: { companyId, id } });
  }

  update(companyId: string, id: string, data: Prisma.CustomerUpdateInput) {
    return this.prisma.customer.update({ where: { id }, data });
  }

  delete(companyId: string, id: string) {
    return this.prisma.customer.deleteMany({ where: { companyId, id } });
  }
}
