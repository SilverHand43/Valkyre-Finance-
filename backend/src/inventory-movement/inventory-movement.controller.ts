import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InventoryMovementService } from './inventory-movement.service';
import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';

@ApiTags('Inventory Movement')
@ApiBearerAuth()
@Controller('inventory-movement')
export class InventoryMovementController {
	constructor(private readonly inventoryMovementService: InventoryMovementService) {}

	@Post()
	create(@CurrentUser() user: RequestUser, @Body() dto: CreateInventoryMovementDto) {
		return this.inventoryMovementService.create(user, dto);
	}

	@Get()
	findAll(@CurrentUser() user: RequestUser) {
		return this.inventoryMovementService.findAll(user);
	}
}
