import { Module } from '@nestjs/common';
import { AccountReceivableController } from './account-receivable.controller';
import { AccountReceivableService } from './account-receivable.service';
import { AccountReceivableRepository } from './account-receivable.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({
  imports: [PrismaModule, AuditLogModule],
  controllers: [AccountReceivableController],
  providers: [AccountReceivableService, AccountReceivableRepository],
})
export class AccountReceivableModule {}
