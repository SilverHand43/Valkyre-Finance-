import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SupplierRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(companyId: string, data: Prisma.SupplierUncheckedCreateInput) {
    return this.prisma.supplier.create({ data: { ...data, companyId } });
  }

  findAll(companyId: string) {
    return this.prisma.supplier.findMany({ where: { companyId }, orderBy: { createdAt: 'desc' } });
  }

  findById(companyId: string, id: string) {
    return this.prisma.supplier.findFirst({ where: { companyId, id } });
  }

  update(companyId: string, id: string, data: Prisma.SupplierUpdateInput) {
    return this.prisma.supplier.update({ where: { id }, data });
  }

  delete(companyId: string, id: string) {
    return this.prisma.supplier.deleteMany({ where: { companyId, id } });
  }
}
