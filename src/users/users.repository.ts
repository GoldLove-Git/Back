import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { PointInput } from './dto/pointInput.dto';

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

  async inputPoint(data : PointInput) {
    const result = await this.usersRepository.findOne({
      where : {
        userId : data.userId
      }
    })
    if(result) {
      result.gold += Number(data.ao)
    }
    await this.usersRepository.save(result)
  }

}
