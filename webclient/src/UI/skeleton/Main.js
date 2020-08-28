import React from "react";
import { Route, Switch } from "react-router-dom";
import { compose } from "react-apollo";
import { store } from "../../store";
import { login } from "../../connections/userConnections";
import AuthCallback from "../../auth/AuthCallback";
import HomePageContainer from "../home-page/HomePageContainer";

const Main = (props) => {
  const { loginToServer } = props;

  if (
    !_.get(store.getState(), "auth.user.id") &&
    _.get(store.getState(), "auth.jwt")
  ) {
    loginToServer().then(({ data }) => {
      store.dispatch({ type: "SET_USER_ID", id: data.login.id });
    });
  }

  return (
    <main className="container main-page">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <HomePageContainer {...props} />}
        />
        <Route
          path="/callback"
          render={(props) => (
            <AuthCallback loginToServer={loginToServer} {...props} />
          )}
        />
      </Switch>
    </main>
  );
};

export default compose(login)(Main);
