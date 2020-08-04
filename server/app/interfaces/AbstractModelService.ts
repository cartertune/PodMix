import { Document } from "mongoose";
import { IDBService } from "./IDBService";
import MongoDBService from "../services/MongoDBService";

export default abstract class AbstractModelService {
  private modelTitle: string;
  private dbService: IDBService;

  constructor(modelTitle: string) {
    this.modelTitle = modelTitle;
    this.dbService = MongoDBService;
  }

  find(query: object): Promise<Document[]> {
    return this.dbService.find(this.modelTitle, query);
  }

  findById(id: string): Promise<Document> {
    return this.dbService.findById(this.modelTitle, id);
  }

  findOneAndUpdate(query: any, updates: object): Promise<Document> {
    return this.dbService.findOneAndUpdate(this.modelTitle, query, updates);
  }

  findOne(query: object): Promise<Document> {
    return this.dbService.findOne(this.modelTitle, query);
  }

  create(obj: object): Promise<Document> {
    return this.dbService.create(this.modelTitle, obj);
  }
}
