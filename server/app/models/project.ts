import { Document, Schema, model } from "mongoose";
import { ObjectID } from "bson";

export interface FileType {
  name: string;
  url: string;
}

export interface SongTime {
  minute: number;
  second: number;
}

export interface Comment {
  _id: string;
  time: SongTime;
  text: string;
  creatorId: string;
}

export interface Mix {
  _id: string;
  title: string;
  file: FileType;
  comments: [Comment];
}

export interface Project extends Document {
  title: string;
  ownerId: string;
  mixes: [Mix];
  collaboratorEmails: [string];
}

const FileSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const SongTimeSchema: Schema = new Schema({
  minute: { type: Number, required: true },
  second: { type: Number, required: true },
});

const CommentSchema: Schema = new Schema({
  time: { type: SongTimeSchema, required: true },
  text: { type: String, required: true },
  creatorId: { type: ObjectID, ref: "User", index: true },
});

const MixSchema: Schema = new Schema({
  title: { type: String, required: true },
  file: { type: FileSchema, required: true },
  comments: { type: [CommentSchema], default: [] },
});

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    ownerId: { type: ObjectID, ref: "User", index: true },
    mixes: { type: [MixSchema], index: true, default: [] },
    collaboratorEmails: { type: [String], index: true, default: [] },
  },
  { timestamps: true }
);

export default ProjectSchema;
