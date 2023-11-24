import { Injectable } from '@nestjs/common';
import {
  Observable,
  catchError,
  filter,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  throwError,
  toArray,
} from 'rxjs';
import { v4 as uuid, validate as uuidValidate } from 'uuid';

import { DbCollectionName, DbRecord, DbService } from '@omni/engine/db';
import { FsFile, FsNode, FsService, FsTree } from '@omni/engine/fs';
import { NxWorkspaceConfiguration } from '@omni/engine/nx';

import { Workspace } from '../models/workspace.model';

@Injectable()
export class WorkspacesService {
  constructor(
    private readonly dbService: DbService,
    private readonly fsService: FsService
  ) {}

  private collection: DbCollectionName = 'workspaces';

  getAll(): Observable<Workspace[]> {
    return this.dbService.getAll(this.collection).pipe(
      switchMap((records) => from(records)),
      map((record) => record as unknown as Workspace),
      mergeMap((workspace) =>
        from(this.fsService.loadTree(workspace.path)).pipe(
          switchMap((tree) => from(this.fsService.get(tree, 'nx.json'))),
          map(() => workspace),
          catchError(() =>
            this.dbService
              .del(this.collection, workspace.id)
              .pipe(map(() => null))
          )
        )
      ),
      filter(Boolean),
      toArray()
    );
  }

  getOne(idOrPath: string): Observable<Workspace | null> {
    return this.dbService
      .get(this.collection, uuidValidate(idOrPath) ? 'id' : 'path', idOrPath)
      .pipe(
        map((record: DbRecord | null) =>
          record !== null ? (record as unknown as Workspace) : null
        )
      );
  }

  add(name: string, path: string): Observable<Workspace> {
    const workspace: Workspace = {
      id: uuid(),
      name,
      path,
    };

    return this.getOne(path).pipe(
      switchMap((existing) =>
        existing
          ? throwError(() => new Error(`Workspace already exists : ${path}`))
          : this.dbService.add(
              this.collection,
              workspace as unknown as DbRecord
            )
      ),
      map((record: DbRecord) => record as unknown as Workspace)
    );
  }

  update(workspace: Workspace): Observable<Workspace> {
    return this.dbService
      .set(this.collection, workspace as unknown as DbRecord)
      .pipe(map((record: DbRecord) => record as unknown as Workspace));
  }

  delete(workspaceId: string): Observable<void> {
    return this.dbService.del(this.collection, workspaceId);
  }

  getFsTree(workspaceIdOrPath: string): Observable<FsTree> {
    return this.getOne(workspaceIdOrPath).pipe(
      switchMap((workspace) =>
        !workspace
          ? throwError(
              () => new Error(`Workspace not found : ${workspaceIdOrPath}`)
            )
          : of(workspace)
      ),
      switchMap((workspace) => from(this.fsService.loadTree(workspace.path)))
    );
  }

  getFsNode(workspaceIdOrPath: string, path: string): Observable<FsNode> {
    return this.getOne(workspaceIdOrPath).pipe(
      switchMap((workspace) =>
        !workspace
          ? throwError(
              () => new Error(`Workspace not found : ${workspaceIdOrPath}`)
            )
          : of(workspace)
      ),
      switchMap((workspace) => from(this.fsService.loadTree(workspace.path))),
      switchMap((tree) => from(this.fsService.get(tree, path)))
    );
  }

  readFs(
    workspaceIdOrPath: string,
    path?: string,
    raw?: boolean
  ): Observable<FsTree | FsNode | string> {
    return this.getOne(workspaceIdOrPath).pipe(
      switchMap((workspace) =>
        !workspace
          ? throwError(
              () => new Error(`Workspace not found : ${workspaceIdOrPath}`)
            )
          : of(workspace)
      ),
      switchMap((workspace) => from(this.fsService.loadTree(workspace.path))),
      switchMap((tree) => from(this.fsService.read(tree, path))),
      switchMap((nodeOrTree) =>
        raw && 'children' in nodeOrTree
          ? throwError(
              () => new Error(`Cannot read a directory raw content : ${path}`)
            )
          : of(raw ? (nodeOrTree as FsFile).content! : nodeOrTree)
      )
    );
  }

  getNxConfig(workspaceIdOrPath: string): Observable<NxWorkspaceConfiguration> {
    return this.getOne(workspaceIdOrPath).pipe(
      switchMap((workspace) =>
        !workspace
          ? throwError(
              () => new Error(`Workspace not found : ${workspaceIdOrPath}`)
            )
          : of(workspace)
      ),
      switchMap((workspace) => from(this.fsService.loadTree(workspace.path))),
      switchMap((tree) => from(this.fsService.read(tree, 'nx.json'))),
      map((nodeOrTree: FsTree | FsNode) => nodeOrTree as FsFile),
      map((configFile: FsFile) => JSON.parse(configFile.content!))
    );
  }
}
