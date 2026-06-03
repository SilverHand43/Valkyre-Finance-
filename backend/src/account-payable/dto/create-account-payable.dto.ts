import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccountPayableStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAccountPayableDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  supplierId?: string;

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

  @ApiPropertyOptional({ enum: AccountPayableStatus })
  @IsOptional()
  @IsEnum(AccountPayableStatus)
  status?: AccountPayableStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;
}
