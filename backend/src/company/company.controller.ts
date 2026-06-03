import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';

@ApiTags('Company')
@ApiBearerAuth()
@Controller('company')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {}

	@Public()
	@Post()
	create(@Body() dto: CreateCompanyDto) {
		return this.companyService.create(dto);
	}

	@Get('me')
	findMyCompany(@CurrentUser() user: RequestUser) {
		return this.companyService.findOne(user);
	}

	@Patch('me')
	updateMyCompany(@CurrentUser() user: RequestUser, @Body() dto: UpdateCompanyDto) {
		return this.companyService.update(user, dto);
	}
}
