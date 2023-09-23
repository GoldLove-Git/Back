import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
//import { GoldHistory } from './entities/goldHistory.entity';
import { Repository } from 'typeorm';
import { PointInput } from './dto/pointInput.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>, //private readonly goldHistoryRepository: Repository<GoldHistory>,
  ) {}

  async findUserByUser(
    userId: string,
    password: string,
  ): Promise<Users | undefined> {
    try {
      const exUser = await this.usersRepository.findOne({
        where: {
          userId,
          password,
        },
      });
      return exUser;
    } catch (e) {
      console.error(e.message);
      throw new Error('UsersRepository / findUserByUser');
    }
  }

  async findUserByID(userId: string): Promise<Users | undefined> {
    const exUser = await this.usersRepository.findOneBy({ userId });
    return exUser;
  }

  async signUp(SignUpDto: SignUpDto) {
    const singupForm = new Users();
    singupForm.userId = SignUpDto.userId;
    singupForm.email = SignUpDto.email;
    singupForm.password = SignUpDto.password;
    singupForm.nickname = SignUpDto.nickname;
    singupForm.ageRange = SignUpDto.ageRange;
    singupForm.gender = SignUpDto.gender;

    const signupResult = await this.usersRepository.save(singupForm);
    return signupResult;
  }

  // userId로 유저 정보 찾기
  async findUserByPk(userId: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { userId } });
    return user;
  }

  async inputPoint(data: PointInput) {
    const result = await this.usersRepository.findOne({
      where: {
        userId: data.uid,
      },
    });
    if (result) {
      result.gold += Number(data.ao);
    }
    await this.usersRepository.save(result);
  }

  async donateGold(userId: string, gold: number) {
    const user = await this.usersRepository.findOneBy({userId})
    if (user) {
      user.gold -= gold
      await this.usersRepository.save(user)
    }
    else {
      throw new NotFoundException(userId);
    }
  }

  async findUserInfo(userId: string) {
    const exUser = await this.usersRepository.findOne({
      where: {
        userId,
      },
      select: {
        userId: true,
        nickname: true,
        gold: true,
      },
    });
    const userData = {
      userId: exUser.userId,
      nickname: exUser.nickname,
      gold: exUser.gold,
    };
    //console.log(userData);
    return userData;
  }
}
