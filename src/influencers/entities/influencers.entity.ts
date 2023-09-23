import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  nowGold: number;

  @Column({
    default : 0
  })
  vote : number;

  @Column({
    default : 1
  })
  goldStep : number;

  @CreateDateColumn({ type: 'timestamp' })
  CreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
