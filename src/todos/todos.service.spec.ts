import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { ITodo } from './interfaces/todo.interface';

describe('TodosService', () => {
  let todoService: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile();

    todoService = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: ITodo[] = [
        {
          id: 1,
          content: 'Workout🏋️',
          completed: false,
        },
      ];
      jest.spyOn(todoService, 'findAll').mockImplementation(async () => result);

      expect(await todoService.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an array of cats', async () => {
      const result: ITodo = {
        id: 1,
        content: 'Workout🏋️',
        completed: false,
      };

      jest.spyOn(todoService, 'findOne').mockImplementation(async () => result);

      expect(await todoService.findOne(0)).toBe(result);
    });
  });
});
