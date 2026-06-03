import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class CustomerService {
	constructor(
		private readonly repository: CustomerRepository,
		private readonly auditLogService: AuditLogService,
	) {}

	create(user: RequestUser, dto: CreateCustomerDto) {
		return this.repository.create(user.companyId, dto as any);
	}

	findAll(user: RequestUser) {
		return this.repository.findAll(user.companyId);
	}

	async findOne(user: RequestUser, id: string) {
		const customer = await this.repository.findById(user.companyId, id);
		if (!customer) {
			throw new NotFoundException('Cliente não encontrado.');
		}
		return customer;
	}

	async update(user: RequestUser, id: string, dto: UpdateCustomerDto) {
		const current = await this.findOne(user, id);
		const updated = await this.repository.update(user.companyId, id, dto as any);
		await this.auditLogService.register({
			companyId: user.companyId,
			userId: user.sub,
			action: AuditAction.UPDATE,
			entity: 'Customer',
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
			entity: 'Customer',
			entityId: id,
			oldData: current as any,
		});
		return { message: 'Cliente removido com sucesso.' };
	}
}
