import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('influencers')
export class Influencers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  influencerId: string;

  @Column()
  influencerName: string;
  
  @Column()
  influencerImg: string;

  @Column()
  nowGold: string;

  @Column()
  CreatedAt: Date;

  @Column()
  updatedAt: Date;
}
