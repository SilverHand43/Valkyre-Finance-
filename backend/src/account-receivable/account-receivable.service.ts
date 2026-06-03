import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { AccountReceivableRepository } from './account-receivable.repository';
import { CreateAccountReceivableDto } from './dto/create-account-receivable.dto';
import { UpdateAccountReceivableDto } from './dto/update-account-receivable.dto';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class AccountReceivableService {
	constructor(
		private readonly repository: AccountReceivableRepository,
		private readonly auditLogService: AuditLogService,
	) {}

	create(user: RequestUser, dto: CreateAccountReceivableDto) {
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
			throw new NotFoundException('Conta a receber não encontrada.');
		}
		return item;
	}

	async update(user: RequestUser, id: string, dto: UpdateAccountReceivableDto) {
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
			entity: 'AccountReceivable',
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
			entity: 'AccountReceivable',
			entityId: id,
			oldData: current as any,
		});
		return { message: 'Conta a receber removida com sucesso.' };
	}
}
