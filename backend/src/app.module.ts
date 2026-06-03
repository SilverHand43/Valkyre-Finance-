import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CompanyModule } from './company/company.module';
import { CustomerModule } from './customer/customer.module';
import { SupplierModule } from './supplier/supplier.module';
import { ProductModule } from './product/product.module';
import { InventoryMovementModule } from './inventory-movement/inventory-movement.module';
import { AccountPayableModule } from './account-payable/account-payable.module';
import { AccountReceivableModule } from './account-receivable/account-receivable.module';
import { CashFlowModule } from './cash-flow/cash-flow.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    AuditLogModule,
    DashboardModule,
    CompanyModule,
    CustomerModule,
    SupplierModule,
    ProductModule,
    InventoryMovementModule,
    AccountPayableModule,
    AccountReceivableModule,
    CashFlowModule,
  ],
})
export class AppModule {}
