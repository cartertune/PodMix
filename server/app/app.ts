import _ from "lodash";
// Database
import DBService from "./services/MongoDBService";
DBService.connect();

// Graphql
import { ApolloServer, gql } from "apollo-server-lambda";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import UserService from "./services/UserService";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ event }) => {
    console.log(event.body);
    console.log("headers:", event);
    return {
      authorization: _.get(event, "headers.authorization")
        ? event.headers.authorization
        : _.get(event, "headers.Authorization")
        ? event.headers.Authorization
        : null,
      validatedUser: await UserService.validateUser(
        _.get(event, "headers.authorization") ||
          _.get(event, "headers.Authorization")
      )
    };
  },
  formatError: (error: any) => {
    console.log(error);
    return error;
  },
  formatResponse: (response: any) => {
    console.log(response);
    return response;
  },
  playground: true
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
