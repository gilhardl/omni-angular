import { BehaviorSubject } from 'rxjs';

import { DbCollectionName } from './collection-name.type';
import { DbRecord } from './record.model';

export interface DbCollection {
  name: DbCollectionName;
  path: string;
  records: DbRecord[];
  records$: BehaviorSubject<DbRecord[]>;
}
