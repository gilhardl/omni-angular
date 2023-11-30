import { Module } from '@nestjs/common';

import { WorkspaceModule } from '@omni/engine/workspaces';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { EnginePlatformProvider, Platform } from '@omni/engine/config';

@Module({
  imports: [WorkspaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
