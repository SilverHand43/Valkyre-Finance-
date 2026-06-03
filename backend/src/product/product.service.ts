import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class ProductService {
	constructor(
		private readonly repository: ProductRepository,
		private readonly auditLogService: AuditLogService,
	) {}

	create(user: RequestUser, dto: CreateProductDto) {
		return this.repository.create(user.companyId, dto as any);
	}

	findAll(user: RequestUser) {
		return this.repository.findAll(user.companyId);
	}

	async findOne(user: RequestUser, id: string) {
		const product = await this.repository.findById(user.companyId, id);
		if (!product) {
			throw new NotFoundException('Produto não encontrado.');
		}
		return product;
	}

	async findLowStock(user: RequestUser) {
		const products = await this.repository.findLowStock(user.companyId);
		return products.filter((item) => item.quantity <= item.minimumStock);
	}

	async update(user: RequestUser, id: string, dto: UpdateProductDto) {
		const current = await this.findOne(user, id);
		const updated = await this.repository.update(user.companyId, id, dto as any);
		await this.auditLogService.register({
			companyId: user.companyId,
			userId: user.sub,
			action: AuditAction.UPDATE,
			entity: 'Product',
			entityId: id,
			oldData: current as any,
			newData: updated as any,
		});
		return updated;
	}

	async remove(user: RequestUser, id: string) {
		const current = await this.findOne(user, id);
		await this.repository.delete(user.companyId, id);
		await this.auditLogService.register({
			companyId: user.companyId,
			userId: user.sub,
			action: AuditAction.DELETE,
			entity: 'Product',
			entityId: id,
			oldData: current as any,
		});
		return { message: 'Produto removido com sucesso.' };
	}
}
