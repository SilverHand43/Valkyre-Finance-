import { BadRequestException, Injectable } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { InventoryMovementRepository } from './inventory-movement.repository';
import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class InventoryMovementService {
	constructor(
		private readonly repository: InventoryMovementRepository,
		private readonly auditLogService: AuditLogService,
	) {}

	async create(user: RequestUser, dto: CreateInventoryMovementDto) {
		try {
			const movement = await this.repository.createWithStockUpdate(user.companyId, user.sub, dto);
			await this.auditLogService.register({
				companyId: user.companyId,
				userId: user.sub,
				action: AuditAction.CREATE,
				entity: 'InventoryMovement',
				entityId: movement.id,
				newData: movement as any,
			});
			return movement;
		} catch (error) {
			throw new BadRequestException(
				error instanceof Error ? error.message : 'Não foi possível registrar a movimentação.',
			);
		}
	}

	findAll(user: RequestUser) {
		return this.repository.findAll(user.companyId);
	}
}
