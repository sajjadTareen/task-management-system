import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Status, Task } from '../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async filterTasks(user: User, filters: any): Promise<Task[]> {
    let queryBuilder = this.taskRepository
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId: user.id });

    if (filters.status) {
      queryBuilder = queryBuilder.andWhere('task.status = :status', {
        status: filters.status,
      });
    }

    if (filters.dueDate) {
      queryBuilder = queryBuilder.andWhere('task.dueDate = :dueDate', {
        dueDate: filters.dueDate,
      });
    } else if (filters.dueDateRange) {
      const { startDate, endDate } = filters.dueDateRange;
      queryBuilder = queryBuilder.andWhere(
        'task.dueDate >= :startDate AND task.dueDate <= :endDate',
        { startDate, endDate },
      );
    }

    return queryBuilder.getMany();
  }
  async createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create({
      user,
      ...createTaskDto,
    });
    return this.taskRepository.save(newTask);
  }

  async getTaskById(id: string, user: User): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id, user: { id: user.id } });
  }

  async updateTask(
    id: string,
    user: User,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | null> {
    const existingTask = await this.getTaskById(id, user);
    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    Object.assign(existingTask, updateTaskDto);
    return this.taskRepository.save(existingTask);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const task = await this.getTaskById(id, user);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.taskRepository.delete({ id, user: { id: user.id } });
  }
}
