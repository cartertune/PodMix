import { gql } from "apollo-server-lambda";

const typeDefs = gql`
  type User {
    id: ID
    username: String
    name: String
    avatarUrl: String
    bio: String
    createdPlaylists: [Playlist]
  }
  type Mutation {
    login: User
  }
  type Query {
    user(id: ID!): User
  }
`;

export default typeDefs;
