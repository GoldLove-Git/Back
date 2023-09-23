import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Query,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup.dto';
import axios from 'axios';
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
    return res.send(`Bearer ${token}`);
    // return res.status(HttpStatus.OK).json({ message: '로그인 성공' });
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

  @Get('mypage')
  async myPage(@Body() body: any, @Res() res: any) {
    let { userId } = body;
    const data = await this.usersService.myPage(userId);

    return res.status(HttpStatus.OK).json({ data });
  }

  @Get('goldhistory')
  async goldHistory(@Body() body: any, @Res() res: any) {
    let { userId } = body;
    const data = await this.usersService.getGoldHistory(userId);

    return res.status(HttpStatus.OK).json({ data });
  }

  @Get('advertisehistory')
  async advertiseHistory(@Body() body: any, @Res() res: any) {
    let { userId } = body;
    const data = await this.usersService.getAdvertiseHistory(userId);
    return res.status(HttpStatus.OK).json({ data });
  }

  @Post('id/check')
  async checkID(@Body() body: any) {
    let { userId } = body;
    const exUser = await this.usersService.checkID(userId);
    if (!exUser) {
      return { isvalid: true };
    } else {
      return { isvalid: false };
    }
  }

  @Get('postback')
  async postback(@Query() data: any) {
    if (data.key && data.ai && data.ao && data.userId) {
      return {
        message: '광고 정보 파라미터가 누락됐습니다',
      };
    }
    return await this.usersService.setAd(data);
  }

  @Post('donate')
  // TODO: 로그인한 사용자의 userId 받아오는 로직 추가
  async donate(@Body() body: any) {
    const { userId, influencer_id, gold } = body;
    return await this.usersService.donate(userId, influencer_id, gold);
  }

  @Get('/adlist')
  async fetchAdList() {
    const api_url = 'https://api.i-screen.kr'
    try {
      const response = await axios.get(`https://api.i-screen.kr/Inappapi/web_ads_list?apikey=${process.env.API_KEY}&appcode=${process.env.APP_CODE}`)
      return response.data.list_data
    }
    catch (error) {
      console.log(error)
    }
  }

  @Post('/joinAd')
  async joinAd(@Body() body : any) {
    const { ai, ak, ap, net, uid } = body
    try {
      const response = await axios.post(`https://api.i-screen.kr/Inappapi/ads_join`, {
        apikey: `${process.env.API_KEY}`,
        ac: `${process.env.APP_CODE}`,
        ai: ai,
        ap: ap,
        net: net,
        uid: uid,
        pub: "",
        ak: ak,
      })
      return response.data
    }
    catch (error) {
      console.log(error)
    }
  }
}
