import { GraphQLServer } from "graphql-yoga";
import connection from "./ormConfig";

const typeDefs = `
  type Query{
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hi there : )"
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

connection.then(() =>
  server.start(() => console.log("Server is running on localhost:4000"))
);
