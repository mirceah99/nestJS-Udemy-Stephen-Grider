import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    if ((await this.userService.find(email)).length)
      throw new HttpException('Email already used', HttpStatus.CONFLICT);

    // Hash user password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;

    const user = await this.userService.create(email, result);
    return user;
  }
  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user)
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

    const [salt, storedHash] = user.password.split('.');
    const hash = ((await scrypt(password, salt, 32)) as Buffer).toString(
      'hex',
    ) as string;

    if (hash !== storedHash)
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

    return user;
  }
}
