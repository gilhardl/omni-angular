import { Module } from '@nestjs/common';

import { EnginePlatformProvider, EnginePlatform } from '@omni/engine/config';

import { FsAdapter } from './services/fs.adapter';
import { FsNodeAdapter } from './services/fs.node.adapter';
import { FsService } from './services/fs.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    // TODO : this should be exported in a global module which will be imported by apps
    {
      provide: EnginePlatformProvider,
      useValue: EnginePlatform.Node,
    },
    {
      provide: FsAdapter,
      useFactory: (platform: EnginePlatform) => {
        switch (platform) {
          case EnginePlatform.Node:
            return new FsNodeAdapter();
          default:
            throw new Error(
              `Platform '${platform}' file system is not supported`
            );
        }
      },
      inject: [EnginePlatformProvider],
    },
    FsService,
  ],
  exports: [FsService],
})
export class FsModule {}
