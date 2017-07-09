import { Db } from 'mongodb';

export interface MongoGraphQLOptions {
  uri?: string;
  url?: string;
  connection?: Db;
  graphiql?: boolean;
}
