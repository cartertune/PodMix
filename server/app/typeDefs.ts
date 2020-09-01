import { gql } from "apollo-server-lambda";

const typeDefs = gql`
  type User {
    id: ID
    name: String
    avatarUrl: String
    email: String
    projects: [Project]
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
  }
  input ProjectInput {
    title: String!
  }
  type Mix {
    id: ID
    fileUrl: String
    fileName: String
    title: String
    comments: [Comment]
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
    # isComplete: Boolean
    creator: User
  }
  input CommentInput {
    time: SongTimeInput!
    text: String!
  }
  type SongTime {
    minute: Int!
    second: Int!
  }
  type S3Response {
    signedRequest: String
    url: String
  }
  input SongTimeInput {
    minute: Int!
    second: Int!
  }
  type Mutation {
    login: User
    createProject(project: ProjectInput!): Project
    addMix(projectId: ID!, mix: MixInput!): Project
    addComment(projectId: ID!, mixId: ID!, comment: CommentInput!): Project
    addCollaborator(projectId: ID!, email: String!): Project
    signS3Url(fileType: String!): S3Response
    #completeComment(projectId: ID!, mixId: ID!, commentId: ID!)
  }
  type Query {
    currentUser(id: ID!): User
    project(id: ID!): Project
  }
`;

export default typeDefs;
