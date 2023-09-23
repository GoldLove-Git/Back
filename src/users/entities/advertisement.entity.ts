import { Users } from './users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
