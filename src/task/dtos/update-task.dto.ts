import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { Status } from '../entities/task.entity';

export class UpdateTaskDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dueDate: Date;
}
