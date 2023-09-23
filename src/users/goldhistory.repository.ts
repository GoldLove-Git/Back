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
    //위형태로 출력해야함
    const goldHistory = await this.goldHistoryRepository.find({
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
