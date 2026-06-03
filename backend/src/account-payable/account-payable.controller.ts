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
import { AccountPayableService } from './account-payable.service';
import { CreateAccountPayableDto } from './dto/create-account-payable.dto';
import { UpdateAccountPayableDto } from './dto/update-account-payable.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';

@ApiTags('Account Payable')
@ApiBearerAuth()
@Controller('account-payable')
export class AccountPayableController {
	constructor(private readonly accountPayableService: AccountPayableService) {}

	@Post()
	create(@CurrentUser() user: RequestUser, @Body() dto: CreateAccountPayableDto) {
		return this.accountPayableService.create(user, dto);
	}

	@Get()
	findAll(@CurrentUser() user: RequestUser) {
		return this.accountPayableService.findAll(user);
	}

	@Get(':id')
	findOne(@CurrentUser() user: RequestUser, @Param('id') id: string) {
		return this.accountPayableService.findOne(user, id);
	}

	@Patch(':id')
	update(
		@CurrentUser() user: RequestUser,
		@Param('id') id: string,
		@Body() dto: UpdateAccountPayableDto,
	) {
		return this.accountPayableService.update(user, id, dto);
	}

	@Delete(':id')
	remove(@CurrentUser() user: RequestUser, @Param('id') id: string) {
		return this.accountPayableService.remove(user, id);
	}
}
