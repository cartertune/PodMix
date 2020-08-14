import { Document, Query } from "mongoose";

export interface IDBService {
  // connects database to server
  connect: () => void;
  find: (modelTitle: string, query: any) => Promise<Document[]>;
  findById: (modelTitle: string, id: string) => Promise<Document>;
  findOneAndUpdate: (
    modelTitle: string,
    query: any,
    updates: object
  ) => Promise<Document>;
  findOne(
    modelTitle: string,
    query: object,
    fields?: object
  ): Promise<Document>;
  create: (modelTitle: string, obj: object) => Promise<Document>;
  count(modelTitle: string, query: object): Promise<number>;
}
