import { QueryService, queryService } from '#service/QueryService';
import { User } from '#shared/types';
import { ApiError } from '#shared/utils';

// getUsers
type GetUsersResponse = {
  data: {
    avatarUrl: string;
    email: string;
    fullName: string;
    id: number;
    description: string;
    tasksCount: number;
    teamId: number;
    teamName: string;
  }[];
};

export class UsersController {

  constructor(private queryService: QueryService) {}

  public async getUsers(): Promise<User[] | ApiError> {
    const res = await this.queryService.get<GetUsersResponse>('/users');

    if (res instanceof ApiError) {
      return res;
    }

    const users: User[] = res.data.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      avatarUrl: user.avatarUrl,
    }));

    return users;
  }
}

export const usersController = new UsersController(queryService);
