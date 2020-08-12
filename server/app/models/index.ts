import { model } from "mongoose";
import UserSchema, { User } from "./user";
import ProjectSchema, { Project } from "./project";
declare global {
  namespace NodeJS {
    interface Global {
      UserModel: any;
      ProjectModel: any;
    }
  }
}

global.UserModel = global.UserModel || model<User>("User", UserSchema);
global.ProjectModel =
  global.ProjectModel || model<Project>("Project", ProjectSchema);
