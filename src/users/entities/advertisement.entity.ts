import { Users } from './users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm';

@Entity('advertisement')
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ai: string;

  @Column()
  ao: string;

  @Column()
  key : string;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
