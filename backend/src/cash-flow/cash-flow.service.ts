import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { CashFlowRepository } from './cash-flow.repository';
import { CreateCashFlowDto } from './dto/create-cash-flow.dto';
import { UpdateCashFlowDto } from './dto/update-cash-flow.dto';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class CashFlowService {
	constructor(
		private readonly repository: CashFlowRepository,
		private readonly auditLogService: AuditLogService,
	) {}

	create(user: RequestUser, dto: CreateCashFlowDto) {
		return this.repository.create(user.companyId, user.sub, {
			...dto,
			date: new Date(dto.date),
		} as any);
	}

	findAll(user: RequestUser) {
		return this.repository.findAll(user.companyId);
	}

	async findOne(user: RequestUser, id: string) {
		const entry = await this.repository.findById(user.companyId, id);
		if (!entry) {
			throw new NotFoundException('Lançamento não encontrado.');
		}
		return entry;
	}

	async update(user: RequestUser, id: string, dto: UpdateCashFlowDto) {
		const current = await this.findOne(user, id);
		const updated = await this.repository.update(id, {
			...dto,
			date: dto.date ? new Date(dto.date) : undefined,
		} as any);
		await this.auditLogService.register({
			companyId: user.companyId,
			userId: user.sub,
			action: AuditAction.UPDATE,
			entity: 'CashFlow',
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
			entity: 'CashFlow',
			entityId: id,
			oldData: current as any,
		});
		return { message: 'Lançamento removido com sucesso.' };
	}
}
