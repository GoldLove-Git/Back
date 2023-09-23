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

  @Column()
  influencerId: string;

  @Column()
  influencerName: string;

  @Column()
  nowGold: string;

  @CreateDateColumn({ type: 'timestamp' })
  CreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
