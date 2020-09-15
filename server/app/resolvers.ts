import { Document } from "mongoose";
import _ from "lodash";
import UserService from "./services/UserService";
import ProjectService from "./services/ProjectService";
import { User } from "./models/user";
import { Project, Comment, Mix } from "./models/project";
import S3Service from "./services/S3Service";

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
      const p: Project = args.project;
      p.ownerId = _.get(ctx, "validatedUser.id");
      p.collaboratorEmails = [_.get(ctx, "validatedUser.email")];
      return ProjectService.create(p);
    },
    addMix: (
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
    addComment: (
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
    signS3Url: (obj: any, args: { fileType: string }, ctx: Context): any => {
      return S3Service.signURL(args.fileType);
    },
  },
  User: {
    name: (user: User): string => {
      return `${user.firstName} ${user.lastName}`;
    },
    projects: (user: User, args: any, ctx: Context): Promise<Document[]> => {
      return ProjectService.find({
        ownerId: user.id,
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
