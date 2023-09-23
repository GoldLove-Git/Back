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
  nowGold: string;

  @Column({
    default : 0
  })
  vote : number;

  @CreateDateColumn({ type: 'timestamp' })
  CreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
