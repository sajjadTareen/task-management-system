import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Req,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { NotFoundException } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { isEnum } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { TaskListDTO } from '../dtos/task-list.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Status, Task } from '../entities/task.entity';
import { TaskService } from '../services/task.service';

@Controller('task')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(
    @Req() req,
    @Query() taskListDto?: TaskListDTO,
  ): Promise<Task[]> {
    const user = req.user;

    const filters = {};
    const { status, dueDate, startDate, endDate } = taskListDto;

    if (status) {
      filters['status'] = status;
    }

    if (dueDate) {
      filters['dueDate'] = dueDate;
    } else if (startDate && endDate) {
      filters['dueDateRange'] = { startDate, endDate };
    }

    return this.taskService.filterTasks(user, filters);
  }

  @Post()
  async createTask(
    @Req() req,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const user = req.user;
    return this.taskService.createTask(user, createTaskDto);
  }

  @Get(':id')
  async getTaskById(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
  ): Promise<Task | null> {
    const user = req.user;
    const task = await this.taskService.getTaskById(id, user);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  @Put(':id')
  async updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task | null> {
    const user = req.user;
    try {
      return await this.taskService.updateTask(id, user, updateTaskDto);
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  @Delete(':id')
  async deleteTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
  ): Promise<void> {
    const user = req.user;
    try {
      await this.taskService.deleteTask(id, user);
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
