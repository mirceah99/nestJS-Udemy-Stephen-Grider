import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  // things that can be use as dependencies for another classes
  // is is the need nest knows to pass them to the constructor function
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
