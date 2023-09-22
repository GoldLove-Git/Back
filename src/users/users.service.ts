import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findUser(userId: string, password: string) {
    const exUser = await this.usersRepository.findUserByUser(userId, password);
    return exUser;
  }
  /* token 설정 */
  async getToken(userId: any): Promise<any> {
    // token 생성
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    return token;
  }

  async signUp(
    userId: string,
    password: string,
    nickname: string,
    ageRange: number,
    gender: string,
  ) {
    const signup = this.usersRepository.signUp(
      userId,
      password,
      nickname,
      ageRange,
      gender,
    );
    return 'signUp';
  }
}
