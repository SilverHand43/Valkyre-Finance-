import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { AccountPayableRepository } from './account-payable.repository';
import { CreateAccountPayableDto } from './dto/create-account-payable.dto';
import { UpdateAccountPayableDto } from './dto/update-account-payable.dto';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class AccountPayableService {
	constructor(
		private readonly repository: AccountPayableRepository,
		private readonly auditLogService: AuditLogService,
	) {}

	create(user: RequestUser, dto: CreateAccountPayableDto) {
		return this.repository.create(user.companyId, {
			...dto,
			dueDate: new Date(dto.dueDate),
			paymentDate: dto.paymentDate ? new Date(dto.paymentDate) : undefined,
		} as any);
	}

	findAll(user: RequestUser) {
		return this.repository.findAll(user.companyId);
	}

	async findOne(user: RequestUser, id: string) {
		const item = await this.repository.findById(user.companyId, id);
		if (!item) {
			throw new NotFoundException('Conta a pagar não encontrada.');
		}
		return item;
	}

	async update(user: RequestUser, id: string, dto: UpdateAccountPayableDto) {
		const current = await this.findOne(user, id);
		const updated = await this.repository.update(id, {
			...dto,
			dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
			paymentDate: dto.paymentDate ? new Date(dto.paymentDate) : undefined,
		} as any);

		await this.auditLogService.register({
			companyId: user.companyId,
			userId: user.sub,
			action: AuditAction.UPDATE,
			entity: 'AccountPayable',
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
			entity: 'AccountPayable',
			entityId: id,
			oldData: current as any,
		});
		return { message: 'Conta a pagar removida com sucesso.' };
	}
}
