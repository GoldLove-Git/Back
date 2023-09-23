import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { PointInput } from './dto/pointInput.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findUserByUser(
    userId: string,
    password: string,
  ): Promise<Users | undefined> {
    try {
      const exUser = await this.usersRepository.findOne({
        where: { userId, password },
      });
      return exUser;
    } catch (e) {
      console.error(e.message);
      throw new Error('UsersRepository / findUserByUser');
    }
  }

  async signUp(SignUpDto: SignUpDto) {
    const singupForm = new Users();
    singupForm.userId = SignUpDto.userId;
    singupForm.email = SignUpDto.email;
    singupForm.password = SignUpDto.password;
    singupForm.nickname = SignUpDto.nickname;
    singupForm.ageRange = SignUpDto.ageRange;
    singupForm.gender = SignUpDto.gender;

    const signupResult = await this.usersRepository.save(singupForm);
    return signupResult;
  }

  async inputPoint(data : PointInput) {
    const result = await this.usersRepository.findOne({
      where : {
        userId : data.userId
      }
    })
    if(result) {
      result.gold += Number(data.ao)
    }
    await this.usersRepository.save(result)
  }

}
