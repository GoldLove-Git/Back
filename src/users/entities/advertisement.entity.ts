import { Users } from './users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('advertisement')
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  advId: string;

  @ManyToOne(() => Users, (user) => user.id)
  @Column()
  userId: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
