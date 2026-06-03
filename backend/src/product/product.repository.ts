import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(companyId: string, data: Prisma.ProductUncheckedCreateInput) {
    return this.prisma.product.create({ data: { ...data, companyId } });
  }

  findAll(companyId: string) {
    return this.prisma.product.findMany({ where: { companyId }, orderBy: { createdAt: 'desc' } });
  }

  findById(companyId: string, id: string) {
    return this.prisma.product.findFirst({ where: { companyId, id } });
  }

  findLowStock(companyId: string) {
    return this.prisma.product.findMany({
      where: { companyId },
    });
  }

  update(companyId: string, id: string, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({ where: { id }, data });
  }

  delete(companyId: string, id: string) {
    return this.prisma.product.deleteMany({ where: { companyId, id } });
  }
}
