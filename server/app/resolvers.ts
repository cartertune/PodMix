import { Document } from "mongoose";
import _ from "lodash";
import UserService from "./services/UserService";
import { IUser } from "./models/user";

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
      ctx: { validatedUser: IUser; authorization: string }
    ): Promise<Document> => {
      return UserService.login(ctx.validatedUser, ctx.authorization);
    },
  },
  User: {},
};

export default resolvers;
