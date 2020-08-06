import { gql } from "apollo-server-lambda";

const typeDefs = gql`
  type User {
    id: ID
    name: String
    avatarUrl: String
    email: String
    projects: [Project]
  }
  type Project {
    title: String
    owner: User
    collaborators: [User]
    mixes: [Mix]
  }
  type Mix {
    file: File
    title: String
    comments: [Comment]
  }
  type Comment {
    time: String # may need to rethink formatting
    text: String
    isComplete: Boolean
  }

  #TODO: Figure out inputs to these mutations
  type Mutation {
    login: User
    createUser: User
    createProject: Project
    createMix: Project
    createComment: Project
  }
  type Query {
    user(id: ID!): User
    project(id: ID!): Project
  }
`;

export default typeDefs;
