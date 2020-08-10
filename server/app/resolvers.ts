import { Document } from "mongoose";
import _ from "lodash";
import UserService from "./services/UserService";
import { User } from "./models/user";

const resolvers = {
  Query: {
    user: (obj: any, args: { id: string }, ctx: any): Promise<Document> => {
      const { id } = args;
      return UserService.findById(id);
    },
  },
  Mutation: {
    login: (
      obj: any,
      args: any,
      ctx: { validatedUser: User; authorization: string }
    ): Promise<Document> => {
      return UserService.login(ctx.validatedUser, ctx.authorization);
    },
  },
  User: {
    projects: (
      user: User,
      args: any,
      ctx: {
        validatedUser: User;
        authorization: string;
      }
    ): Promise<Document> => {
      return ProjectService.find({
        _id: { $in: _.get(user, "projectIds", []) },
      });
    },
  },
  Project: {},
  Mix: {},
  Comment: {},
};

export default resolvers;
