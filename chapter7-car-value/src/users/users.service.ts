import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from './users.entity';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.userRepo.create({ email, password });
    return this.userRepo.save(user);
  }
  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user)
      throw new HttpException(
        `User with id ${id} not found `,
        HttpStatus.NOT_FOUND,
      );
    return user;
  }
  find(email: string) {
    return this.userRepo.find({ where: { email } });
  }
  async update(id: number, attrs: Omit<Partial<User>, 'id'>) {
    const user = await this.findOne(id);
    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }
}
