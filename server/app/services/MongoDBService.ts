import mongoose, { Model, Document, model } from "mongoose";
import { IDBService } from "../interfaces/IDBService";

class MongoDBService implements IDBService {
  private isConnected: boolean = false;
  connect(): void {
    if (!this.isConnected && mongoose.connection.readyState == 0) {
      mongoose.Promise = global.Promise;
      // TODO: make process environment variable
      mongoose.connect(process.env.MONGO_DB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true
      });
      console.log("Connecting...");
      mongoose.connection
        .once("connected", () => {
          this.isConnected = true;
          console.log("Connected to Mongo instance.");
        })
        .on("error", error => console.log("Error connecting to Mongo:", error));

      // import schemas
      import("../models/index");
    }
  }

  find(modelTitle: string, query: any): Promise<Document[]> {
    const model: Model<Document> = this.getModel(modelTitle);
    return model.find(query).exec();
  }

  findById(modelTitle: string, id: string): Promise<Document> {
    const model: Model<Document> = this.getModel(modelTitle);
    return model.findById(id).exec();
  }

  findOneAndUpdate(
    modelTitle: string,
    query: any,
    updates: object
  ): Promise<Document> {
    const model: Model<Document> = this.getModel(modelTitle);
    return model.findOneAndUpdate(query, updates, { new: true }).exec();
  }

  findOne(modelTitle: string, query: object): Promise<mongoose.Document> {
    const model: Model<Document> = this.getModel(modelTitle);
    return model.findOne(query).exec();
  }

  create(modelTitle: string, obj: object): Promise<Document> {
    const model: Model<Document> = this.getModel(modelTitle);
    const doc: Document = new model(obj);
    return doc.save();
  }

  private getModel(modelTitle: string): Model<Document> {
    const model: Model<Document> = mongoose.model(modelTitle);
    if (model) {
      return model;
    }
    throw new Error("Could not connect to modelTitle " + model);
  }
}

// For a singleton
export default new MongoDBService();
