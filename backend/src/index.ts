import { GraphQLServer } from "graphql-yoga";

import connection from "./ormConfig";
import schema from "./schema";

const server = new GraphQLServer({ schema });

connection.then(() =>
  server.start(() => console.log("Server is running on localhost:4000"))
);
