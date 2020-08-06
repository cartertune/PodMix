import { gql } from "apollo-server-lambda";

const typeDefs = gql`
  type User {
    id: ID
    name: String
    avatarUrl: String
    email: String
    projects: [Project]
    meta: Meta
  }
  input UserInput {
    name: String!
    avatarUrl: String
    email: String
  }
  type Project {
    id: ID
    title: String
    owner: User
    collaboratorEmails: [String]
    collaborators: [User]
    mixes: [Mix]
    meta: Meta
  }
  input ProjectInput {
    title: String!
  }
  type Mix {
    id: ID
    file: File
    title: String
    comments: [Comment]
    meta: Meta
  }
  input MixInput {
    title: String!
    fileUrl: String!
    fileName: String
  }
  type Comment {
    id: ID
    time: SongTime # may need to rethink formatting
    text: String
    isComplete: Boolean
    meta: Meta
  }
  input CommentInput {
    time: SongTime!
    text: String!
  }
  type SongTime {
    minute: Int!
    second: Int!
  }
  type File {
    name: String
    url: String
    meta: Meta
  }
  type Meta {
    creator: [User]
    createdAt: Date
  }

  type Mutation {
    login: User
    createUser(user: UserInput!): User
    createProject(project: ProjectInput!): Project
    createMix(mix: MixInput!): Project
    createComment(comment(CommentInput!)): Project
    addCollaborator(email: String!): Project
    completeComment(commentId: ID!)
  }
  type Query {
    currentUser(id: ID!): User
    project(id: ID!): Project
  }
`;

export default typeDefs;
