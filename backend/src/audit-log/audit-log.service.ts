import { Injectable } from '@nestjs/common';
import { AuditAction, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditLogService {
	constructor(private readonly prisma: PrismaService) {}

	async register(params: {
		companyId: string;
		userId?: string;
		action: AuditAction;
		entity: string;
		entityId?: string;
		oldData?: Prisma.InputJsonValue;
		newData?: Prisma.InputJsonValue;
		ip?: string;
	}) {
		return this.prisma.auditLog.create({
			data: {
				companyId: params.companyId,
				userId: params.userId,
				action: params.action,
				entity: params.entity,
				entityId: params.entityId,
				oldData: params.oldData,
				newData: params.newData,
				ip: params.ip,
			},
		});
	}
}
