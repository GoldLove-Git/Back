import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AdvertisementRepository } from './advertisement.repository';
import * as jwt from 'jsonwebtoken';
import { Advertisement } from './entities/advertisement.entity';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private advertisementRepository: AdvertisementRepository,
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

  async signUp(SignUpDto: SignUpDto) {
    const signup = this.usersRepository.signUp(SignUpDto);
    return 'signUp';
  }

  async getAdvertiseHistory(userId: string): Promise<Advertisement[]> {
    const advertisement = this.advertisementRepository.findAdByUser(userId);
    return advertisement;
  }

  // urser 정보 findByPk
  async findUserByPk(userId: string): Promise<any> {
    const user = await this.usersRepository.findUserByPk(userId);
    return user;
  }
}
