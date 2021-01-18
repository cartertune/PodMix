import React from "react";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http/lib/index";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { Provider } from "react-redux";

import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";
import Skeleton from "./UI/skeleton/Skeleton";
import { BrowserRouter } from "react-router-dom";
import { setContext } from "apollo-link-context";
import "./util/google-analytics.js";
import { hotjar } from "react-hotjar";

const hjid = "2148313";
const hjsv = "6";
hotjar.initialize(hjid, hjsv);

const authLink = setContext((req, prevContext) => {
  const jwt = _.get(store.getState(), "auth.jwt", "");
  if (jwt) {
    return {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };
  }
  return prevContext;
});
const httpLink = new HttpLink({
  uri: process.env.SERVER_URL,
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const App = (props) => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Skeleton />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
