import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  userId: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  gender: string;

  @Column()
  ageRange: number;

  @Column({ default: 0 })
  gold: number;
 
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
