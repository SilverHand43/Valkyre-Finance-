import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccountReceivableStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAccountReceivableDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsDateString()
  dueDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  paymentDate?: string;

  @ApiPropertyOptional({ enum: AccountReceivableStatus })
  @IsOptional()
  @IsEnum(AccountReceivableStatus)
  status?: AccountReceivableStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;
}
