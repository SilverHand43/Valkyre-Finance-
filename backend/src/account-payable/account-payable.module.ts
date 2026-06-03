import { Module } from '@nestjs/common';
import { AccountPayableController } from './account-payable.controller';
import { AccountPayableService } from './account-payable.service';
import { AccountPayableRepository } from './account-payable.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({
  imports: [PrismaModule, AuditLogModule],
  controllers: [AccountPayableController],
  providers: [AccountPayableService, AccountPayableRepository],
})
export class AccountPayableModule {}
