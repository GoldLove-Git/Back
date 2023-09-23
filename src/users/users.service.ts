import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AdvertisementRepository } from './advertisement.repository';
import * as jwt from 'jsonwebtoken';
import { Advertisement } from './entities/advertisement.entity';
import { AdCheckDto } from './dto/adCheck.dto';
import { AdWriteDto } from './dto/adWrite.dto';
import { PointInput } from './dto/pointInput.dto';
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

  async setAd(data : any) {
    const { key, ai, ao, userId} : AdWriteDto = data
    const adCheck : AdCheckDto = {key ,ai, userId}
    const adCheckRes = await this.advertisementRepository.adCheck(adCheck)
    if(adCheckRes) {
      return {
        message : '참여 기록이 있습니다' 
      }
    }

    const inputPoint : PointInput = {userId, ao}
    await this.advertisementRepository.writeAd(data)
    await this.usersRepository.inputPoint(inputPoint)
    return {
      message : '참여가 완료되었습니다' 
    }

  }
}
