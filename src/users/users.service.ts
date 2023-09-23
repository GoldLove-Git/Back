import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AdvertisementRepository } from './advertisement.repository';
import * as jwt from 'jsonwebtoken';
import { Advertisement } from './entities/advertisement.entity';
import { AdCheckDto } from './dto/adCheck.dto';
import { AdWriteDto } from './dto/adWrite.dto';
import { PointInput } from './dto/pointInput.dto';
import { SignUpDto } from './dto/signup.dto';
import { InfluencerRepository } from 'src/influencers/influencers.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private advertisementRepository: AdvertisementRepository,
    private influencerRepository : InfluencerRepository
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
  async setAd(data: any) {
    const { key, ai, ao, uid, ak }: AdWriteDto = data;
    const adCheck: AdCheckDto = { key, ai, uid }; 
    const adCheckRes = await this.advertisementRepository.adCheck(adCheck);
    if (adCheckRes) {
      console.log('asdasd'+adCheckRes)
      return {
        message: '참여 기록이 있습니다',
      };
    }

    const inputPoint: PointInput = { uid, ao };
    await this.usersRepository.inputPoint(inputPoint);
    const vote = await this.influencerRepository.findOne({
        where : {influencerId : ak}
      })
    vote.vote += 1
    await this.influencerRepository.save(vote)
    await this.advertisementRepository.writeAd(data);
    return {
      message: '참여가 완료되었습니다',
    };
  }

  async checkID(userId: string) {
    const exUser = await this.usersRepository.findUserByID(userId);
    return exUser;
  }
}
