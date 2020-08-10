import AModelService from "../interfaces/AbstractModelService";
import { Document } from "mongoose";
import { Mix, Project } from "../models/project";
import _ from "lodash";

class ProjectService extends AModelService {
  constructor() {
    super("Project");
  }

  addMix(
    validatedUserId: string,
    projectId: string,
    mix: Mix
  ): Promise<Document> {
    return this.findOneAndUpdate(
      { _id: projectId, creatorId: validatedUserId },
      {
        $push: { mixes: mix },
      }
    );
  }
}

export default new ProjectService();
