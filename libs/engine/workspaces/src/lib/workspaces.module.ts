import { Module } from '@nestjs/common';

import { DbModule } from '@omni/engine/db';
import { FsModule } from '@omni/engine/fs';

import { WorkspacesController } from './controllers/workspaces.controller';
import { WorkspacesService } from './services/workspaces.service';

@Module({
  imports: [DbModule, FsModule],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
})
export class WorkspaceModule {}
