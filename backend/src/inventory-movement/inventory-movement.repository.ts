import { Injectable } from '@nestjs/common';
import { Prisma, InventoryMovementType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryMovementRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createWithStockUpdate(companyId: string, userId: string, data: {
    productId: string;
    type: InventoryMovementType;
    quantity: number;
    reason?: string;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findFirst({ where: { companyId, id: data.productId } });
      if (!product) {
        throw new Error('Produto não encontrado.');
      }

      const nextQuantity =
        data.type === InventoryMovementType.ENTRY
          ? product.quantity + data.quantity
          : data.type === InventoryMovementType.EXIT
            ? product.quantity - data.quantity
            : data.quantity;

      if (nextQuantity < 0) {
        throw new Error('Estoque não pode ficar negativo.');
      }

      await tx.product.update({
        where: { id: product.id },
        data: { quantity: nextQuantity },
      });

      return tx.inventoryMovement.create({
        data: {
          companyId,
          userId,
          productId: product.id,
          type: data.type,
          quantity: data.quantity,
          reason: data.reason,
        },
      });
    });
  }

  findAll(companyId: string) {
    return this.prisma.inventoryMovement.findMany({
      where: { companyId },
      include: { product: true, user: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
