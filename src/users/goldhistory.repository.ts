import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoldHistory } from './entities/goldHistory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoldHistoryRepository {
  constructor(
    @InjectRepository(GoldHistory)
    private readonly goldHistoryRepository: Repository<GoldHistory>,
  ) {}

  async getGoldHistory(userId: string) {
    //   {
    //     "data" : [
    //         {
    //             "influencer_name" : "인플루언서 이름",
    //             "gold" : 2, // 지급한 골드 양
    //             "date" : "2023-09-20" // 지급일
    //         },
    //         ...
    //     ]
    // }
    //위형태로 출력해야함
    const goldHistory = await this.goldHistoryRepository.findOne({
      where: {
        userId,
      },
      select: {
        influencerName: true,
        gold: true,
        date: true,
      },
    });

    return goldHistory;
  }
}
