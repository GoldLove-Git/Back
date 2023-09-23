import { Users } from './users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('advertisement')
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  advId: string;

  @ManyToOne(() => Users, (user) => user.id)
  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
