import { Module } from '@nestjs/common';
import { InventoryMovementController } from './inventory-movement.controller';
import { InventoryMovementService } from './inventory-movement.service';
import { InventoryMovementRepository } from './inventory-movement.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({
  imports: [PrismaModule, AuditLogModule],
  controllers: [InventoryMovementController],
  providers: [InventoryMovementService, InventoryMovementRepository],
})
export class InventoryMovementModule {}
