import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  sub: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  bio: string;
}

const UserSchema: Schema = new Schema(
  {
    sub: { type: String, required: true, index: true },
    username: { type: String, required: true, index: true },
    firstName: { type: String },
    lastName: { type: String },
    avatarUrl: { type: String },
    bio: { type: String }
  },
  { timestamps: true }
);

export default UserSchema;
