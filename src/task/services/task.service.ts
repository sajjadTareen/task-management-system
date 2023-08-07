import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService {
  tasks: Task[] = [];

  getTaskById(id: string) {
    const task = this.tasks.find((t) => t.id === id);
    return task;
  }

  getTaskList() {
    return this.tasks;
  }

  createTask(task: CreateTaskDto) {
    const newTask: Task = {
      id: randomUUID(),
      ...task,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, task: UpdateTaskDto) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      return null;
    }
    Object.assign(this.tasks[index], {
      ...task,
      updatedAt: new Date(),
    });
    return this.tasks[index];
  }

  deleteTask(id: string) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      return null;
    }
    const task = this.tasks[index];
    this.tasks.splice(index, 1);
    return task;
  }
}
