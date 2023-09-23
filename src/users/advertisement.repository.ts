import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertisement } from './entities/advertisement.entity';

@Injectable()
export class AdvertisementRepository {
  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementRepository: Repository<Advertisement>,
  ) {}

  async findAdByUser(
    userId: string,
  ): Promise<Advertisement[] | undefined> {
    try {
      const advertisements = await this.advertisementRepository.find({
        where: { userId },
      });
      return advertisements;
    } catch (e) {
      console.error(e.message);
      throw new Error('AdvertisementRepository / findAdByUser');
    }
  }
}
