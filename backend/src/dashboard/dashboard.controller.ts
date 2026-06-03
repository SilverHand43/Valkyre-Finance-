import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	@Get('monthly-revenue')
	monthlyRevenue(@CurrentUser() user: RequestUser) {
		return this.dashboardService.monthlyRevenue(user.companyId);
	}

	@Get('monthly-expenses')
	monthlyExpenses(@CurrentUser() user: RequestUser) {
		return this.dashboardService.monthlyExpenses(user.companyId);
	}

	@Get('monthly-profit')
	monthlyProfit(@CurrentUser() user: RequestUser) {
		return this.dashboardService.monthlyProfit(user.companyId);
	}

	@Get('cash-flow')
	cashFlow(@CurrentUser() user: RequestUser) {
		return this.dashboardService.cashFlow(user.companyId);
	}

	@Get('low-stock-products')
	lowStockProducts(@CurrentUser() user: RequestUser) {
		return this.dashboardService.lowStockProducts(user.companyId);
	}

	@Get('top-customers')
	topCustomers(@CurrentUser() user: RequestUser) {
		return this.dashboardService.topCustomers(user.companyId);
	}

	@Get('top-products-sold')
	topProductsSold(@CurrentUser() user: RequestUser) {
		return this.dashboardService.topSoldProducts(user.companyId);
	}
}
