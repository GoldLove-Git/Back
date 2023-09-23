import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  gender: string;

  @Column()
  ageRange: number;

  @Column()
  gold: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
