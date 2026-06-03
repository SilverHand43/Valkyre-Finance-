import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({ data });
  }

  findById(id: string) {
    return this.prisma.company.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.CompanyUpdateInput) {
    return this.prisma.company.update({ where: { id }, data });
  }
}
