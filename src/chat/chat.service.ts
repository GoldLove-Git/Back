import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { ChatInputDto } from './dto/chatInput.dto';
import { ChatListDto } from './dto/chatList.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private readonly chat : Repository<Chat>
    ){} 

    async getChatList(influencerId : string) : Promise<ChatListDto[]> {
        return this.chat.find({
            where : {
                influencerId : influencerId
            }
        })

    }

    async setChat(chatInputDto : ChatInputDto) : Promise<Chat> {
        const result = this.chat.create({
            comment : chatInputDto.comment,
            nickname : chatInputDto.nickname,
            influencerId : chatInputDto.influencerId
        })
        await this.chat.save(result)
        return result
    }

    async getUserToken() {

    }

}