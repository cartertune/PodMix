import { Document, Schema, model } from "mongoose";

export interface User extends Document {
  sub: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  email: string;
  projectIds: [string];
}

const UserSchema: Schema = new Schema(
  {
    sub: { type: String, required: true, index: true },
    email: { type: String, required: true, index: true },
    firstName: { type: String },
    lastName: { type: String },
    avatarUrl: { type: String },
    projectIds: { type: [String], index: true },
  },
  { timestamps: true }
);

export default UserSchema;
