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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';

@ApiTags('Customer')
@ApiBearerAuth()
@Controller('customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Post()
	create(@CurrentUser() user: RequestUser, @Body() dto: CreateCustomerDto) {
		return this.customerService.create(user, dto);
	}

	@Get()
	findAll(@CurrentUser() user: RequestUser) {
		return this.customerService.findAll(user);
	}

	@Get(':id')
	findOne(@CurrentUser() user: RequestUser, @Param('id') id: string) {
		return this.customerService.findOne(user, id);
	}

	@Patch(':id')
	update(
		@CurrentUser() user: RequestUser,
		@Param('id') id: string,
		@Body() dto: UpdateCustomerDto,
	) {
		return this.customerService.update(user, id, dto);
	}

	@Delete(':id')
	remove(@CurrentUser() user: RequestUser, @Param('id') id: string) {
		return this.customerService.remove(user, id);
	}
}
