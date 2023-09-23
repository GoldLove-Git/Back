import { Users } from './../entities/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('goldHistory')
export class GoldHistory {
  @PrimaryGeneratedColumn()
  id: number;

  //유저 아이디
  @ManyToOne(() => Users, (user) => user.userId)
  @Column()
  userId: string;

  //사용 타입 적립,소비
  @Column()
  type: string;

  //인플루언서 아이디
  @Column()
  influencerId: string;

  //현재 골드 보유량
  @Column()
  nowGold: number;

  //사용 골드
  @Column({ default: 0 })
  useGold: number;

  //획득골드
  @Column({ default: 0 })
  getGold: number;

  //남은 골드
  @Column()
  remainGold: number;

  //생성일
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
