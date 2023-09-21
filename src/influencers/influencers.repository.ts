import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from "typeorm";
import { Influencers } from "./entities/influencers.entity";
import { InfluencerDto } from "./dto/response-influencer.dto";

@Injectable()
export class InfluencerRepository extends Repository<Influencers> {
    constructor(private dataSource: DataSource) {
        super(Influencers, dataSource.createEntityManager());
    }
}