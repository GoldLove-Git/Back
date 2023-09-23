import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AdvertisementRepository } from './advertisement.repository';
import { GoldHistoryRepository } from './goldhistory.repository';
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
    private goldhistory: GoldHistoryRepository,
    private influencerRepository: InfluencerRepository,
  ) {}

  private calculateRange(value: number): number {
    if (value <= 500000) {
      /* 누적 골드 50000까지의 범위 */
      return 1;
    }
    else if (value <= 1000000 ) {
      /* 누적 골드 1000000까지의 범위 */
      return 2;
    }
    else if (value <= 3000000) {
      /* 누적 골드 3000000까지의 범위 */
      return 3;
    }
    else if (value <= 10000000) {
      /* 누적 골드 10000000까지의 범위 */
      return 4;
    }
  }

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
      //console.log('asdasd' + adCheckRes);
      return {
        message: '참여 기록이 있습니다',
      };
    }

    const inputPoint: PointInput = { uid, ao };
    await this.usersRepository.inputPoint(inputPoint);
    const vote = await this.influencerRepository.findOne({
      where: { influencerId: ak },
    });
    vote.vote += 1;
    await this.influencerRepository.save(vote);
    await this.advertisementRepository.writeAd(data);
    return {
      message: '참여가 완료되었습니다',
    };
  }

  async checkID(userId: string) {
    const exUser = await this.usersRepository.findUserByID(userId);
    return exUser;
  }

  async donate(userId: string, influencer_id: string, gold: number) {
    // 인플루언서의 gold 증가, 사용자의 gold 감소
    const user = await this.usersRepository.findUserByID(userId)
    const influencer = await this.influencerRepository.findOneBy({ influencerId: influencer_id })

    if (user.gold >= gold) {
      influencer.nowGold += gold
      influencer.goldStep = this.calculateRange(influencer.nowGold)

      await this.usersRepository.donateGold(user.userId, gold);
      await this.influencerRepository.save(influencer);
    }

    return {
      success: user.gold >= gold? true : false,
      influencer_name: influencer.influencerName,
      gold: gold
    }
  }

  // 지급 골드 내역 조회
  async getGoldHistory(userId: string) {
    const goldHistory = await this.goldhistory.getGoldHistory(userId);
    return goldHistory;
  }

  // 마이페이지
  async myPage(userId: string) {
    const user = await this.usersRepository.findUserInfo(userId);
    //console.log(user);
    return user;
  }
}
