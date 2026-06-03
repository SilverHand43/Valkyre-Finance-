import { Injectable } from '@nestjs/common';
import {
	AccountPayableStatus,
	AccountReceivableStatus,
	InventoryMovementType,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
	constructor(private readonly prisma: PrismaService) {}

	private monthRange() {
		const now = new Date();
		const start = new Date(now.getFullYear(), now.getMonth(), 1);
		const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
		return { start, end };
	}

	async monthlyRevenue(companyId: string) {
		const { start, end } = this.monthRange();
		const result = await this.prisma.accountReceivable.aggregate({
			where: {
				companyId,
				status: AccountReceivableStatus.RECEIVED,
				paymentDate: { gte: start, lt: end },
			},
			_sum: { amount: true },
		});
		return Number(result._sum.amount ?? 0);
	}

	async monthlyExpenses(companyId: string) {
		const { start, end } = this.monthRange();
		const result = await this.prisma.accountPayable.aggregate({
			where: {
				companyId,
				status: AccountPayableStatus.PAID,
				paymentDate: { gte: start, lt: end },
			},
			_sum: { amount: true },
		});
		return Number(result._sum.amount ?? 0);
	}

	async monthlyProfit(companyId: string) {
		const revenue = await this.monthlyRevenue(companyId);
		const expenses = await this.monthlyExpenses(companyId);
		return revenue - expenses;
	}

	async cashFlow(companyId: string) {
		const { start, end } = this.monthRange();
		return this.prisma.cashFlow.findMany({
			where: { companyId, date: { gte: start, lt: end } },
			orderBy: { date: 'desc' },
		});
	}

	async lowStockProducts(companyId: string) {
		const products = await this.prisma.product.findMany({ where: { companyId } });
		return products.filter((item) => item.quantity <= item.minimumStock);
	}

	async topCustomers(companyId: string) {
		const grouped = await this.prisma.accountReceivable.groupBy({
			by: ['customerId'],
			where: { companyId, customerId: { not: null } },
			_sum: { amount: true },
			orderBy: { _sum: { amount: 'desc' } },
			take: 5,
		});

		const ids = grouped.map((g) => g.customerId).filter((id): id is string => !!id);
		const customers = await this.prisma.customer.findMany({
			where: { companyId, id: { in: ids } },
			select: { id: true, name: true },
		});

		return grouped.map((item) => ({
			customerId: item.customerId,
			customerName: customers.find((c) => c.id === item.customerId)?.name ?? 'N/A',
			total: Number(item._sum.amount ?? 0),
		}));
	}

	async topSoldProducts(companyId: string) {
		const grouped = await this.prisma.inventoryMovement.groupBy({
			by: ['productId'],
			where: { companyId, type: InventoryMovementType.EXIT },
			_sum: { quantity: true },
			orderBy: { _sum: { quantity: 'desc' } },
			take: 5,
		});

		const ids = grouped.map((g) => g.productId);
		const products = await this.prisma.product.findMany({
			where: { companyId, id: { in: ids } },
			select: { id: true, name: true },
		});

		return grouped.map((item) => ({
			productId: item.productId,
			productName: products.find((p) => p.id === item.productId)?.name ?? 'N/A',
			totalSold: item._sum.quantity ?? 0,
		}));
	}
}
