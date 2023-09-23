import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AdvertisementRepository } from './advertisement.repository';
import * as jwt from 'jsonwebtoken';
import { Advertisement } from './entities/advertisement.entity';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private advertisementRepository: AdvertisementRepository
  ) {}

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

  async getAdvertiseHistory(userId: string): Promise<Advertisement[]> {
    const advertisement = this.advertisementRepository.findAdByUser(userId)
    return advertisement
  }
}
