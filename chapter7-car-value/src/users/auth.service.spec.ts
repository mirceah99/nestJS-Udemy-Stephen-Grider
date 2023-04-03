import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import User from './users.entity';
import { UsersService } from './users.service';

describe('Auth service', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;
  const password = '123tests',
    email = 'test@test.test';
  beforeEach(async () => {
    const users: User[] = [];
    fakeUserService = {
      find: (email: String) =>
        Promise.resolve(users.filter((user) => user.email === email)),
      create: (email: string, password: string) => {
        const user: User = {
          email,
          password,
          id: Math.floor(Math.random() * 5_000_000),
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUserService },
      ],
    }).compile();
    service = module.get(AuthService);
  });
  it('can create a instance of auth service', async () => {
    expect(service).toBeDefined();
  });
  it('create a new user with a salted and hashed password', async () => {
    const user = await service.signup(email, password);
    expect(user.password).not.toEqual(password);
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
  it('throw an error if user sings up with an email that is already in use', async () => {
    await service.signup(email, password);
    await expect(service.signup(email, password)).rejects.toThrow(
      'Email already used',
    );
  });
  it('trows if signin is called with an unregister email', async () => {
    await expect(service.signin('mircea@123.com', 'password')).rejects.toThrow(
      'Invalid credentials',
    );
  });
  it('trows if invalid password passed', async () => {
    await service.signup(email, password);
    await expect(
      service.signin(email, password + '-incorrect'),
    ).rejects.toThrow('Invalid credentials');
  });
  it('returns a user if correct password provided', async () => {
    await service.signup(email, password);
    const user = await service.signin(email, password);
    expect(user).toBeDefined();
  });
});
