import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('influencers')
export class Influencers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  influencerId: string;

  @Column()
  influencerName: string;

  @Column()
  nowGold: string;

  @Column()
  CreatedAt: Date;

  @Column()
  updatedAt: Date;
}
