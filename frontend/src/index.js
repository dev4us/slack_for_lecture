import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

import client from "./apolloClient";

ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <App />
      </ApolloHooksProvider>
    </ApolloProvider>
  </>,
  document.getElementById("root")
);
