import {
  IsString,
  IsEnum,
  IsDateString,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(['TODO', 'IN_PROGRESS', 'DONE'])
  status: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;
}
