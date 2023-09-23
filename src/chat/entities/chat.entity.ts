import { Influencers } from 'src/influencers/entities/influencers.entity';


import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert, 
  JoinColumn} from 'typeorm';


@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Influencers, (influencer : Influencers) => influencer.influencerId)
  @JoinColumn({ name: 'influencerId', referencedColumnName: 'influencerId' })
  influencerId: string; 
 
  @Column()
  nickname: string; 

  @Column()
  comment: string; 

  @Column({
    default : false 
  })
  delete: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  CreatedAt: Date;
}
