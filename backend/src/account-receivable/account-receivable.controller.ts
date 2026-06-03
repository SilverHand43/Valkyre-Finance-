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
import { AccountReceivableService } from './account-receivable.service';
import { CreateAccountReceivableDto } from './dto/create-account-receivable.dto';
import { UpdateAccountReceivableDto } from './dto/update-account-receivable.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';

@ApiTags('Account Receivable')
@ApiBearerAuth()
@Controller('account-receivable')
export class AccountReceivableController {
	constructor(private readonly accountReceivableService: AccountReceivableService) {}

	@Post()
	create(@CurrentUser() user: RequestUser, @Body() dto: CreateAccountReceivableDto) {
		return this.accountReceivableService.create(user, dto);
	}

	@Get()
	findAll(@CurrentUser() user: RequestUser) {
		return this.accountReceivableService.findAll(user);
	}

	@Get(':id')
	findOne(@CurrentUser() user: RequestUser, @Param('id') id: string) {
		return this.accountReceivableService.findOne(user, id);
	}

	@Patch(':id')
	update(
		@CurrentUser() user: RequestUser,
		@Param('id') id: string,
		@Body() dto: UpdateAccountReceivableDto,
	) {
		return this.accountReceivableService.update(user, id, dto);
	}

	@Delete(':id')
	remove(@CurrentUser() user: RequestUser, @Param('id') id: string) {
		return this.accountReceivableService.remove(user, id);
	}
}
