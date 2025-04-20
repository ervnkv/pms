import { QueryService } from '#service/QueryService';
import { Board, Priority, Status, Task } from '#shared/types';
import { ApiError } from '#shared/utils';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { BoardsController } from './BoardsController';

describe('BoardsController', () => {
  let boardsController: BoardsController;
  let queryService: QueryService;
  let mock: MockAdapter;
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    // Создаем новый экземпляр axios
    axiosInstance = axios.create({
      baseURL: 'test-api',
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Создаем QueryService с замоканным axios
    queryService = new QueryService(axiosInstance);
    mock = new MockAdapter(axiosInstance);

    // Создаем BoardsController с QueryService
    boardsController = new BoardsController(queryService);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('getBoards', () => {
    it('возвращает массив Board при успешном запросе', async () => {
      const mockResponse = {
        data: [
          {
            id: 1,
            name: 'Project A',
            description: 'Main project board',
          },
          {
            id: 2,
            name: 'Project B',
            description: 'Secondary project board',
          },
        ],
      };

      mock.onGet('/boards').reply(200, mockResponse);

      const result = await boardsController.getBoards();

      expect(result).toEqual(mockResponse.data);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при ошибке запроса', async () => {
      mock.onGet('/boards').reply(500, { message: 'Server Error' });

      const result = await boardsController.getBoards();

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Request failed with status code 500');
    });

    it('возвращает пустой массив при пустом ответе', async () => {
      const mockResponse = {
        data: [],
      };

      mock.onGet('/boards').reply(200, mockResponse);

      const result = await boardsController.getBoards();

      expect(result).toEqual([]);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при сетевой ошибке', async () => {
      mock.onGet('/boards').networkError();

      const result = await boardsController.getBoards();

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Network Error');
    });
  });

  describe('getTasksOnBoard', () => {
    const mockBoard: Board = {
      id: 1,
      name: 'Project A',
      description: 'Main project board',
      taskCount: -1,
    };

    it('возвращает массив Task с boardId и boardName при успешном запросе', async () => {
      const mockResponse = {
        data: [
          {
            id: 101,
            title: 'Task 1',
            description: 'First task',
            priority: Priority.High,
            status: Status.Backlog,
            assignee: {
              id: 1,
              fullName: 'John Doe',
              email: 'john@example.com',
              avatarUrl: 'https://example.com/avatar1.jpg',
            },
          },
          {
            id: 102,
            title: 'Task 2',
            description: 'Second task',
            priority: Priority.Medium,
            status: Status.InProgress,
            assignee: {
              id: 2,
              fullName: 'Jane Smith',
              email: 'jane@example.com',
              avatarUrl: 'https://example.com/avatar2.jpg',
            },
          },
        ],
      };

      const expectedTasks: Task[] = [
        {
          id: 101,
          title: 'Task 1',
          description: 'First task',
          priority: Priority.High,
          status: Status.Backlog,
          assignee: {
            id: 1,
            fullName: 'John Doe',
            email: 'john@example.com',
            avatarUrl: 'https://example.com/avatar1.jpg',
          },
          boardId: mockBoard.id,
          boardName: mockBoard.name,
        },
        {
          id: 102,
          title: 'Task 2',
          description: 'Second task',
          priority: Priority.Medium,
          status: Status.InProgress,
          assignee: {
            id: 2,
            fullName: 'Jane Smith',
            email: 'jane@example.com',
            avatarUrl: 'https://example.com/avatar2.jpg',
          },
          boardId: mockBoard.id,
          boardName: mockBoard.name,
        },
      ];

      mock.onGet(`/boards/${mockBoard.id}`).reply(200, mockResponse);

      const result = await boardsController.getTasksOnBoard(mockBoard);

      expect(result).toEqual(expectedTasks);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при ошибке запроса', async () => {
      mock.onGet(`/boards/${mockBoard.id}`).reply(404, { message: 'Board not found' });

      const result = await boardsController.getTasksOnBoard(mockBoard);

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Request failed with status code 404');
    });

    it('возвращает пустой массив при пустом ответе', async () => {
      const mockResponse = {
        data: [],
      };

      mock.onGet(`/boards/${mockBoard.id}`).reply(200, mockResponse);

      const result = await boardsController.getTasksOnBoard(mockBoard);

      expect(result).toEqual([]);
      expect(result).not.toBeInstanceOf(ApiError);
    });

    it('возвращает ApiError при сетевой ошибке', async () => {
      mock.onGet(`/boards/${mockBoard.id}`).networkError();

      const result = await boardsController.getTasksOnBoard(mockBoard);

      expect(result).toBeInstanceOf(ApiError);
      expect((result as ApiError).text).toBe('Network Error');
    });
  });
});