import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { SupplierRepository } from './supplier.repository';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class SupplierService {
	constructor(
		private readonly repository: SupplierRepository,
		private readonly auditLogService: AuditLogService,
	) {}

	create(user: RequestUser, dto: CreateSupplierDto) {
		return this.repository.create(user.companyId, dto as any);
	}

	findAll(user: RequestUser) {
		return this.repository.findAll(user.companyId);
	}

	async findOne(user: RequestUser, id: string) {
		const supplier = await this.repository.findById(user.companyId, id);
		if (!supplier) {
			throw new NotFoundException('Fornecedor não encontrado.');
		}
		return supplier;
	}

	async update(user: RequestUser, id: string, dto: UpdateSupplierDto) {
		const current = await this.findOne(user, id);
		const updated = await this.repository.update(user.companyId, id, dto as any);
		await this.auditLogService.register({
			companyId: user.companyId,
			userId: user.sub,
			action: AuditAction.UPDATE,
			entity: 'Supplier',
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
			entity: 'Supplier',
			entityId: id,
			oldData: current as any,
		});
		return { message: 'Fornecedor removido com sucesso.' };
	}
}
