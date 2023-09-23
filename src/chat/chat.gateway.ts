import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatService } from './chat.service';
import { ChatInputDto } from './dto/chatInput.dto';
import { ChatListDto } from './dto/chatList.dto';
import { ChatByInfluencerDto } from './dto/chatByinfluencer.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server : Server; 
    constructor(
        private readonly chatService : ChatService
    ) {}

    async handleConnection(socket : Socket) {
        
    }

    @SubscribeMessage('chat_input')
    async chatInput(
        @MessageBody() data : ChatInputDto,
        @ConnectedSocket() socket : Socket
    ) {
        const result = await this.chatService.setChat(data)

        this.server.sockets.emit('chat_output', result)
    }

    @SubscribeMessage('req_chat_list')
    async chatList(
        @MessageBody() data : ChatByInfluencerDto,
        @ConnectedSocket() socket : Socket
    ) {
        const result = await this.chatService.getChatList(data.influencerId)
        
        socket.emit('res_chat_list', result)
    }



}