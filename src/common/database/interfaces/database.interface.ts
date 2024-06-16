import type { PopulateOptions } from 'mongoose';

// find one
export interface DatabaseFindOneOptions<T = void> {
  select?: Record<string, boolean | number> | string;
  join?: boolean | PopulateOptions | PopulateOptions[];
  session?: T;
  withDeleted?: boolean;
}

// create
export interface DatabaseCreateOptions<T = void>
  extends Pick<DatabaseFindOneOptions<T>, 'session'> {
  _id?: string;
}
