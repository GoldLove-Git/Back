import { Injectable } from '@nestjs/common';
import { Influencers } from './entities/influencers.entity';

@Injectable()
export class InfluencersService {
    async getInfluencerList(): Promise<Influencers> {
        // return this.
    }
}
