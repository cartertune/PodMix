import AModelService from "../interfaces/AbstractModelService";
import { Document } from "mongoose";
import { Mix, Project, Comment } from "../models/project";
import _ from "lodash";
import EmailNotificationService from "./EmailNotificationService";
import { User } from "../models/user";
import UserService from "./UserService";

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
      { _id: projectId },
      {
        $push: { mixes: mix },
      }
    );
  }

  addCollaborator(
    validatedUser: User,
    projectId: string,
    email: string
  ): Promise<Document> {
    return this.findOneAndUpdate(
      { _id: projectId },
      {
        $addToSet: { collaboratorEmails: email.toLowerCase() },
      }
    ).then((project) => {
      EmailNotificationService.onAddCollaboratorEmail(
        email,
        UserService.getName(validatedUser),
        project as Project
      );
    }) as Promise<Document>;
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

  deleteComment(
    validatedUser: User,
    projectId: string,
    mixId: string,
    commentId: string
  ): Promise<Document> {
    return this.findOneAndUpdate(
      {
        _id: projectId,
        "mixes._id": mixId,
        collaboratorEmails: validatedUser.email,
      },
      {
        $pull: { "mixes.$.comments": { _id: commentId } },
      }
    );
  }

  async completeComment(
    validatedUser: User,
    projectId: string,
    mixId: string,
    commentId: string
  ): Promise<Document> {
    const project: Project = (await this.findOne({
      _id: projectId,
      collaboratorEmails: validatedUser.email,
    })) as Project;

    _.forEach(project.mixes, (mix) => {
      if (mix._id == mixId) {
        _.forEach(mix.comments, (comm) => {
          if (comm._id == commentId) {
            comm.isComplete = !comm.isComplete;
          }
        });
      }
    });
    return project.save();
  }
}

export default new ProjectService();
