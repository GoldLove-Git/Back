import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: any, @Res() res: any) {
    let { userId, password } = body;
    let user = await this.usersService.findUser(userId, password);

    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: '로그인 실패' });
    }

    const token = await this.usersService.getToken(userId);
    res.cookie('authorization', `Bearer ${token}`);
    return res.status(HttpStatus.OK).json({ message: '로그인 성공' });
  }

  @Post('signup')
  async signUp(@Body() SignUpDto: SignUpDto, @Res() res: any) {
    let user = await this.usersService.signUp(SignUpDto);

    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: '회원가입 실패' });
    }

    return res.status(HttpStatus.OK).json({ message: '회원가입 성공' });
  }

  @Post('mypage')
  async myPage(@Body() body: any, @Res() res: any) {
    let { userId } = body;

    return 'mypage';
  }

  @Get('goldhistory')
  async goldHistory(@Body() body: any, @Res() res: any) {
    let { userId } = body;

    return 'goldhistory';
  }

  @Get('advertisehistory')
  async advertiseHistory(@Body() body: any, @Res() res: any) {
    let { userId } = body;

    return this.usersService.getAdvertiseHistory(userId);
  }
}
