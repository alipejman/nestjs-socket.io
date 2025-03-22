import { Module } from '@nestjs/common';
import { IndexGateway } from './index.gateway';
import { GroupGateway } from './group/group.gateway';
import { ChannelGateway } from './channel/channel.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [IndexGateway, GroupGateway, ChannelGateway],
})
export class AppModule {}
