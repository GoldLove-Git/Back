import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertisement } from './entities/advertisement.entity';
import { AdCheckDto } from './dto/adCheck.dto';
import { AdWriteDto } from './dto/adWrite.dto';

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

  async adCheck(adCheck : AdCheckDto) : Promise<Advertisement> {
    return this.advertisementRepository.findOne({
      where : {
        ai : adCheck.ai,
        userId : adCheck.uid,
        key : adCheck.key
      }
    })
  }

  async writeAd(data : AdWriteDto) {
    const result = this.advertisementRepository.create({
      influencerId : data.ak,
      ai : data.ai,
      ao : data.ao,
      key : data.key,
      userId : data.uid
    })
    return await this.advertisementRepository.save(result)
  }
}
