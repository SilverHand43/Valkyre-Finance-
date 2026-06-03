import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CashFlowService } from './cash-flow.service';
import { CreateCashFlowDto } from './dto/create-cash-flow.dto';
import { UpdateCashFlowDto } from './dto/update-cash-flow.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';

@ApiTags('Cash Flow')
@ApiBearerAuth()
@Controller('cash-flow')
export class CashFlowController {
	constructor(private readonly cashFlowService: CashFlowService) {}

	@Post()
	create(@CurrentUser() user: RequestUser, @Body() dto: CreateCashFlowDto) {
		return this.cashFlowService.create(user, dto);
	}

	@Get()
	findAll(@CurrentUser() user: RequestUser) {
		return this.cashFlowService.findAll(user);
	}

	@Get(':id')
	findOne(@CurrentUser() user: RequestUser, @Param('id') id: string) {
		return this.cashFlowService.findOne(user, id);
	}

	@Patch(':id')
	update(
		@CurrentUser() user: RequestUser,
		@Param('id') id: string,
		@Body() dto: UpdateCashFlowDto,
	) {
		return this.cashFlowService.update(user, id, dto);
	}

	@Delete(':id')
	remove(@CurrentUser() user: RequestUser, @Param('id') id: string) {
		return this.cashFlowService.remove(user, id);
	}
}
