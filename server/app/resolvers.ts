import { Document } from "mongoose";
import _ from "lodash";
import UserService from "./services/UserService";
import ProjectService from "./services/ProjectService";
import { User } from "./models/user";
import { Project, Comment, Mix } from "./models/project";

export interface Context {
  validatedUser: User;
  authorization: string;
}

const resolvers = {
  Query: {
    currentUser: (obj: any, args: any, ctx: Context): Promise<Document> => {
      return UserService.findById(_.get(ctx, "validatedUser.id"));
    },
    project: (
      obj: any,
      args: { id: string },
      ctx: Context
    ): Promise<Document> => {
      return ProjectService.findById(args.id);
    },
  },
  Mutation: {
    login: (obj: any, args: any, ctx: Context): Promise<Document> => {
      return UserService.login(ctx.validatedUser, ctx.authorization);
    },
    createProject: (
      obj: any,
      args: { project: Project },
      ctx: Context
    ): Promise<Document> => {
      const project: Project = args.project;
      project.ownerId = _.get(ctx, "validatedUser.id");
      return ProjectService.create(project);
    },
    createMix: (
      obj: any,
      args: {
        projectId: string;
        mix: Mix;
      },
      ctx: Context
    ): Promise<Document> => {
      const validatedUserId = _.get(ctx, "validatedUser.id");
      const { projectId, mix } = args;
      return ProjectService.addMix(validatedUserId, projectId, mix);
    },
    createComment: (
      obj: any,
      args: {
        projectId: string;
        mixId: string;
        comment: Comment;
      },
      ctx: Context
    ): Promise<Document> => {
      const validatedUserId = _.get(ctx, "validatedUser.id");
      const { projectId, mixId, comment } = args;
      return ProjectService.addComment(
        validatedUserId,
        projectId,
        mixId,
        comment
      );
    },
    addCollaborator: (
      obj: any,
      args: {
        projectId: string;
        email: string;
      },
      ctx: Context
    ): Promise<Document> => {
      const { projectId, email } = args;
      return ProjectService.addCollaborator(projectId, email);
    },
  },
  User: {
    projects: (user: User, args: any, ctx: Context): Promise<Document[]> => {
      return ProjectService.find({
        _id: { $in: _.get(user, "projectIds", []) },
      });
    },
  },
  Project: {
    owner: (project: Project, args: any, ctx: Context): Promise<Document> => {
      return UserService.findById(project.ownerId);
    },
    collaborators: (project: Project): Promise<Document[]> => {
      return UserService.find({
        email: { $in: _.get(project, "collaboratorEmails") },
      });
    },
  },
  Comment: {
    creator: (comment: Comment): Promise<Document> => {
      return UserService.findById(_.get(comment, "creatorId"));
    },
  },
};

export default resolvers;
