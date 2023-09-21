import { Influencers } from 'src/influencers/entities/influencers.entity';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Influencers, (influencer) => influencer.influencerId)
  @Column()
  influencerId: string;

  @Column()
  nickname: string;

  @Column()
  comment: string;

  @Column()
  delete: boolean;

  @Column()
  CreatedAt: Date;
}
