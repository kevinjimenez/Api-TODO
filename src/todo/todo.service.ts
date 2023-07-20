import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = await this.todoRepository.create(createTodoDto);
    await this.todoRepository.save(todo);

    return todo;
  }

  findAll() {
    return this.todoRepository.find({});
  }

  async findOne(id: string) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) throw new NotFoundException(`TODO with id: ${id} not found`);

    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.preload({ id, ...updateTodoDto });
    if (!todo) throw new NotFoundException(`TODO with id: ${id} not found`);

    await this.todoRepository.save(todo);
    return todo;
  }

  async remove(id: string) {
    const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
  }
}
