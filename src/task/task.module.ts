import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './controllers/task.controller';
import { Task } from './entities/task.entity';
import { TaskService } from './services/task.service';

@Module({
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService],
})
export class TaskModule {}
