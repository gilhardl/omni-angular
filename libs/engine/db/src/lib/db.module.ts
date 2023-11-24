import { Module } from '@nestjs/common';

import { ConfigModule } from '@omni/engine/config';

import { DbService } from './services/db.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
