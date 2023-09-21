import { Injectable, NotFoundException } from '@nestjs/common';
import { Influencers } from './entities/influencers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InfluencerRepository } from './influencers.repository';

@Injectable()
export class InfluencersService {
    constructor(
        @InjectRepository(InfluencerRepository)
        private influencerRepository: InfluencerRepository
    ) {}

    async getInfluencerList(): Promise<Influencers[]> {
        return this.influencerRepository.find();
    }

    async getInfluencerInfo(name: string): Promise<Influencers> {
        const query = this.influencerRepository.createQueryBuilder('influencers');
        query.where('influencers.influencerId = :name', {name: name});

        if (!query) {
            throw new NotFoundException(`ID가 "${name}"인 인플루언서를 찾을 수 없습니다.`);
        }
        const influencer = await query.getOne();
        
        return influencer;
    }

    async getGoldRank(n: number): Promise<Influencers[]> {
        return this.influencerRepository.find({
            order: {nowGold: 'ASC'},
            take: n
        });
    }

    async getVoteRank(n: number): Promise<Influencers[]> {
        return this.influencerRepository.find({
            // order: {nowGold: 'ASC'},
            take: n
        });
    }
}
