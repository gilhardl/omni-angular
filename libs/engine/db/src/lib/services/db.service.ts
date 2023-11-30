import { Injectable } from '@nestjs/common';
import { join } from 'path';

import { ConfigService } from '@omni/engine/config';

import { ensureFileSync, readFile, writeFile } from 'fs-extra';
import { produce } from 'immer';
import { BehaviorSubject, Observable, concatMap, from, map, take } from 'rxjs';
import { DbCollection, DbRecord } from '../models';
import { DbCollectionName } from '../models/collection-name.type';

const COLLECTIONS: DbCollectionName[] = ['workspaces'];

@Injectable()
export class DbService {
  // private readonly collections: DbCollection[] = [];

  private readonly data: Record<DbCollectionName, DbCollection>;

  constructor(private readonly configService: ConfigService) {
    // this.loadCollections();

    this.data = Object.fromEntries<DbCollection>(
      COLLECTIONS.map<[DbCollectionName, DbCollection]>((collectionName) => [
        collectionName,
        {
          name: collectionName,
          path: join(this.configService.dbRoot, `${collectionName}.json`),
          records: [],
          records$: new BehaviorSubject<DbRecord[]>([]),
        },
      ])
    ) as Record<DbCollectionName, DbCollection>;

    this.loadData();
  }

  getAll(collectionName: DbCollectionName): Observable<DbRecord[]> {
    // TODO: should re-read collection from files beacause the app continue running after a request is made and maybe the file has changed
    return this.data[collectionName].records$.asObservable().pipe(take(1));
  }

  get(
    collectionName: DbCollectionName,
    key = 'id',
    value: string
  ): Observable<DbRecord | null> {
    return this.getAll(collectionName).pipe(
      map((records) => records.find((record) => record[key] === value) ?? null)
    );
  }

  add(
    collectionName: DbCollectionName,
    record: DbRecord
  ): Observable<DbRecord> {
    return this.getAll(collectionName).pipe(
      map((records) =>
        produce(records, (draft) => {
          draft.push(record);
        })
      ),
      concatMap((records) => this.write(this.data[collectionName], records)),
      map(() => record)
    );
    // const collection = this.collection(collectionName);
    // collection.records.push(record);
    // return this.write(collection, collection.records);
  }

  set(
    collectionName: DbCollectionName,
    record: DbRecord
  ): Observable<DbRecord> {
    return this.getAll(collectionName).pipe(
      map((records) =>
        produce(records, (draft) =>
          draft.map((r) => (r.id === record.id ? record : r))
        )
      ),
      concatMap((records) => this.write(this.data[collectionName], records)),
      map(() => record)
    );
    // const collection = this.collection(collectionName);
    // return this.write(
    //   collection,
    //   collection.records.map((r) => (r.id === record.id ? record : r))
    // );
  }

  del(collectionName: DbCollectionName, recordId: string): Observable<void> {
    return this.getAll(collectionName).pipe(
      map((records) =>
        produce(records, (draft) => draft.filter((r) => r.id !== recordId))
      ),
      concatMap((records) => this.write(this.data[collectionName], records)),
      map(() => void 0)
    );
    // const collection = this.collection(collectionName);
    // collection.records = collection.records.filter(
    //   (record) => record.id !== recordId
    // );
    // return this.write(collection, collection.records);
  }

  // private collection(name: DbCollectionName): DbCollection {
  //   const collection = this.collections.find(
  //     (collection) => collection.name === name
  //   );

  //   if (!collection) throw new Error(`Database collection '${name}' not found`);
  //   else return collection;
  // }

  private async read(collection: DbCollection): Promise<DbRecord[]> {
    const raw = await readFile(collection.path, 'utf8');

    const records = raw === '' ? [] : (JSON.parse(raw) as DbRecord[]);

    if (raw === '') this.write(collection, records).subscribe();
    else this.data[collection.name].records$.next(records);

    return records;
  }

  // private async write(
  //   collection: DbCollection,
  //   records?: DbRecord[]
  // ): Promise<void> {
  //   return writeFile(collection.path, JSON.stringify(records), 'utf8');
  // }

  private write(
    collection: DbCollection,
    records: DbRecord[]
  ): Observable<DbRecord[]> {
    return from(
      writeFile(collection.path, JSON.stringify(records), 'utf8')
    ).pipe(
      map(() => records)
      // tap(this.data[collection.name].records$.next)
    );
  }

  // private async loadCollections() {
  //   const collections = [];

  //   for (const collectionName of COLLECTIONS) {
  //     const collection: DbCollection = {
  //       name: collectionName,
  //       path: join(this.configService.dbRoot, `${collectionName}.json`),
  //       records: [],
  //       records$: new BehaviorSubject<DbRecord[]>([]),
  //     };

  //     ensureFileSync(collection.path);

  //     collection.records = await this.read(collection);

  //     collections.push(collection);
  //   }

  //   this.collections.push(...collections);
  // }

  private async loadData(): Promise<void> {
    for (const collectionName in this.data) {
      const collection = this.data[collectionName as DbCollectionName];

      ensureFileSync(collection.path);

      // collection.records$.next(await this.read(collection));
      return this.read(collection).then(() => void 0);
    }
  }
}
