import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { tap } from 'rxjs';
import { WorkspacesService } from '../services/workspaces.service';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly service: WorkspacesService) {}

  @Post()
  createWorkspace(@Body() { name, path }: { name: string; path: string }) {
    if (!name) throw new Error('Please provide a name for the workspace');

    return this.service.add(name, path);
  }

  @Get()
  findAllWorkspaces() {
    return this.service.getAll();
  }

  @Get(':id')
  findWorkspace(@Param() { id }: { id: string }) {
    return this.service.getOne(id);
  }

  @Get(':id/fs')
  findWorkspaceFs(
    @Param() { id }: { id: string },
    @Query() { path }: { path?: string }
  ) {
    if (path !== undefined && path !== '/')
      return this.service.getFsNode(id, path);
    else return this.service.getFsTree(id);
  }

  @Get(':id/fs/read')
  readWorkspaceFs(
    @Param() { id }: { id: string },
    @Query() { path, raw }: { path?: string; raw?: boolean },
    @Res({ passthrough: true }) res: Response
  ) {
    return this.service.readFs(id, path !== '/' ? path : undefined, raw).pipe(
      tap(() => {
        if (raw) res.append('Content-Type', 'text/plain');
      })
    );
    // const node = await this.service.readFs(id, path !== '/' ? path : undefined);

    // if (!raw) {
    //   return node;
    // } else {
    //   if ('children' in node)
    //     throw new Error(`Cannot read a directory raw content : ${path}`);
    //   else {
    //     res.append('Content-Type', 'text/plain');
    //     return (node as FsFile).content;
    //   }
    // }
  }

  @Get(':id/nx')
  findWorkspaceNxConfig(@Param() { id }: { id: string }) {
    return this.service.getNxConfig(id);
  }
}
