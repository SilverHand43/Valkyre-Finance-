import { Injectable } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class CompanyService {
	constructor(
		private readonly repository: CompanyRepository,
		private readonly auditLogService: AuditLogService,
	) {}

	async create(dto: CreateCompanyDto) {
		return this.repository.create(dto);
	}

	async findOne(user: RequestUser) {
		return this.repository.findById(user.companyId);
	}

	async update(user: RequestUser, dto: UpdateCompanyDto) {
		const current = await this.repository.findById(user.companyId);
		const updated = await this.repository.update(user.companyId, dto);

		await this.auditLogService.register({
			companyId: user.companyId,
			userId: user.sub,
			action: AuditAction.UPDATE,
			entity: 'Company',
			entityId: user.companyId,
			oldData: current as any,
			newData: updated as any,
		});

		return updated;
	}
}
