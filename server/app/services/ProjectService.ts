import AModelService from "../interfaces/AbstractModelService";
import { Document } from "mongoose";
import { Mix, Project, Comment } from "../models/project";
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
    console.log(validatedUserId, mix, projectId);
    return this.findOneAndUpdate(
      { _id: projectId, ownerId: validatedUserId },
      {
        $push: { mixes: mix },
      }
    );
  }

  addCollaborator(projectId: string, email: string): Promise<Document> {
    return this.findOneAndUpdate(
      { _id: projectId },
      {
        $addToSet: { collaboratorEmails: email },
      }
    );
  }

  addComment(
    validatedUserId: string,
    projectId: string,
    mixId: string,
    comment: Comment
  ): Promise<Document> {
    comment.creatorId = validatedUserId;
    return this.findOneAndUpdate(
      { _id: projectId, "mixes._id": mixId },
      {
        $push: { "mixes.$.comments": comment },
      }
    );
  }
}

export default new ProjectService();
