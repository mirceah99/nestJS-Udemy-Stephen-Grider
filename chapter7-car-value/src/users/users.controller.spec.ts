import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import User from './users.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  const mockUser: User = {
    id: 1,
    email: 'test@test.com',
    password: 'password',
  } as User;
  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => Promise.resolve({ ...mockUser, id } as User),
      find: (email: string) =>
        Promise.resolve([{ ...mockUser, email } as User]),
      // update: () => {},
      // remove: () => {},
    };
    fakeAuthService = {
      // signup: () => {},
      // signin: () => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('find all users return a list with all users with that email', async () => {
    const users = await controller.findAllUsers('mircea@test.t');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('mircea@test.t');
  });
});
