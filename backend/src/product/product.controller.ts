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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	create(@CurrentUser() user: RequestUser, @Body() dto: CreateProductDto) {
		return this.productService.create(user, dto);
	}

	@Get()
	findAll(@CurrentUser() user: RequestUser) {
		return this.productService.findAll(user);
	}

	@Get('low-stock')
	lowStock(@CurrentUser() user: RequestUser) {
		return this.productService.findLowStock(user);
	}

	@Get(':id')
	findOne(@CurrentUser() user: RequestUser, @Param('id') id: string) {
		return this.productService.findOne(user, id);
	}

	@Patch(':id')
	update(
		@CurrentUser() user: RequestUser,
		@Param('id') id: string,
		@Body() dto: UpdateProductDto,
	) {
		return this.productService.update(user, id, dto);
	}

	@Delete(':id')
	remove(@CurrentUser() user: RequestUser, @Param('id') id: string) {
		return this.productService.remove(user, id);
	}
}
