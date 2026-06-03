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
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';

@ApiTags('Supplier')
@ApiBearerAuth()
@Controller('supplier')
export class SupplierController {
	constructor(private readonly supplierService: SupplierService) {}

	@Post()
	create(@CurrentUser() user: RequestUser, @Body() dto: CreateSupplierDto) {
		return this.supplierService.create(user, dto);
	}

	@Get()
	findAll(@CurrentUser() user: RequestUser) {
		return this.supplierService.findAll(user);
	}

	@Get(':id')
	findOne(@CurrentUser() user: RequestUser, @Param('id') id: string) {
		return this.supplierService.findOne(user, id);
	}

	@Patch(':id')
	update(
		@CurrentUser() user: RequestUser,
		@Param('id') id: string,
		@Body() dto: UpdateSupplierDto,
	) {
		return this.supplierService.update(user, id, dto);
	}

	@Delete(':id')
	remove(@CurrentUser() user: RequestUser, @Param('id') id: string) {
		return this.supplierService.remove(user, id);
	}
}
