import { ApiQuery } from '@nestjs/swagger';
import { IsEnum, IsDateString, IsOptional } from 'class-validator';
import { Status } from '../entities/task.entity';

export class TaskListDTO {
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
