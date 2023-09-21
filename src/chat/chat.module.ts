import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Users } from 'src/users/entities/users.entity';
import { Influencers } from 'src/influencers/entities/influencers.entity';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
    imports : [
        TypeOrmModule.forFeature([
            Chat
          ]),
        ],
    providers : [ChatGateway, ChatService],

})
export class ChatModule {}
