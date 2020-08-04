import { Document } from "mongoose";

export interface IModelService {
    findById: () => Document;
}