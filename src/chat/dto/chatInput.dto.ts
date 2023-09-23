import {PickType} from '@nestjs/swagger'
import { ChatDto } from './chat.dto';

export class ChatInputDto extends PickType(ChatDto,[
    'nickname',
    'comment',
    'influencerId'
]) {}