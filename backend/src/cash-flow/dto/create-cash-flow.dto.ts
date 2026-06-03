import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CashFlowType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCashFlowDto {
  @ApiProperty({ enum: CashFlowType })
  @IsEnum(CashFlowType)
  type: CashFlowType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsDateString()
  date: string;
}
