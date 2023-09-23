import {PickType} from '@nestjs/swagger'
import { ChatDto } from './chat.dto';

export class ChatByInfluencerDto extends PickType(ChatDto,[
    'influencerId'
]) {}