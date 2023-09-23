import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findUserByUser(
    userId: string,
    password: string,
  ): Promise<Users | undefined> {
    try {
      const exUser = await this.usersRepository.findOne({
        where: { userId, password },
      });
      return exUser;
    } catch (e) {
      console.error(e.message);
      throw new Error('UsersRepository / findUserByUser');
    }
  }

  async findUserByID(
    userId: string
  ): Promise<Users | undefined> {
      const exUser = await this.usersRepository.findOne({
        where: { userId }
      });
      return exUser;
  }

  async signUp(
    userId: string,
    password: string,
    nickname: string,
    ageRange: number,
    gender: string,
  ) {
    const signupResult = await this.usersRepository.save({
      userId,
      password,
      nickname,
      ageRange,
      gender,
    });

    return signupResult;
  }
}
