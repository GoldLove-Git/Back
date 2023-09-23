import { PickType } from '@nestjs/swagger';
import { ChatDto } from './chat.dto';

export class ChatListDto extends PickType(ChatDto, ['nickname', 'comment']) {}
