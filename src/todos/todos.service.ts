import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    this.todoRepository.save(createTodoDto);
  }

  async findAll() {
    return this.todoRepository.find();
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (todo) {
      return todo;
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    await this.todoRepository.update(id, updateTodoDto);
    const updatedTodo = await this.todoRepository.findOneBy({ id });
    if (updatedTodo) {
      return updatedTodo;
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    const deletedTodo = await this.todoRepository.delete(id);
    if (!deletedTodo.affected) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
  }
}
