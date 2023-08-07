import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { TaskService } from '../services/task.service';
import { UpdateTaskDto } from '../dtos/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get(':id')
  getTaskbyId(@Param('id') id: string) {
    const res = this.taskService.getTaskById(id);
    if (!res) throw new NotFoundException(`Task with ID ${id} not found`);
    return res;
  }

  @Get()
  getTaskList() {
    return this.taskService.getTaskList();
  }

  @Post()
  postTask(@Body() task: CreateTaskDto) {
    return this.taskService.createTask(task);
  }

  @Put(':id')
  patchTask(@Param('id') id: string, @Body() updatedTask: UpdateTaskDto) {
    const res = this.taskService.updateTask(id, updatedTask);
    if (!res) throw new NotFoundException(`Task with ID ${id} not found`);
    return res;
  }

  @Delete(':id')
  deletTask(@Param('id') id: string) {
    const res = this.taskService.deleteTask(id);
    if (!res) throw new NotFoundException(`Task with ID ${id} not found`);
    return res;
  }
}
