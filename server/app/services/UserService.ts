import AModelService from "../interfaces/AbstractModelService";
import { Document } from "mongoose";
import { User } from "../models/user";
import Auth0Service from "./Auth0Service";
import { first } from "lodash";

class UserService extends AModelService {
  constructor() {
    super("User");
  }

  login(user: User, token: string): Promise<Document> {
    console.log("token:", token);
    if (!user) {
      return this.createFromAuthToken(token);
    }
    return Promise.resolve(user);
  }

  async validateUser(authorization: string): Promise<Document> {
    const maybeValidatedUser = await Auth0Service.validateJWT(authorization);
    return maybeValidatedUser
      ? this.findOne({ sub: maybeValidatedUser.sub })
      : null;
  }

  async createFromAuthToken(token: string): Promise<Document> {
    const validatedUser = await Auth0Service.validateJWT(token);
    const {
      sub,
      nickname,
      email,
      family_name,
      given_name,
      picture,
    } = validatedUser;

    const user: any = {};
    user.sub = sub;
    user.username = nickname;
    user.lastName = family_name;
    user.firstName = given_name;
    user.avatarUrl = picture;
    user.email = email;

    return this.create(user);
  }
  getName(user: User): string {
    const { firstName, lastName, email } = user;

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else {
      return email.split("@")[0];
    }
  }
}

export default new UserService();
