import { model } from "mongoose";
import UserSchema, { IUser } from "./user";
declare global {
  namespace NodeJS {
    interface Global {
      UserModel: any;
    }
  }
}

global.UserModel = global.UserModel || model<IUser>("User", UserSchema);
