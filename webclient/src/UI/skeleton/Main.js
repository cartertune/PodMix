import React from "react";
import { Route, Switch } from "react-router-dom";
import { compose } from "react-apollo";
import { store } from "../../store";
import { login } from "../../connections/userConnections";
import AuthCallback from "../../auth/AuthCallback";
import HomePageContainer from "../dashboard/HomePageContainer";
import ProjectPageContainer from "../project-page/ProjectPageContainer";
import PrivacyPolicyPage from "../splash-page/PrivacyPolicyPage";
import LoginSplashPage from "../splash-page/LoginSplashPage";

const Main = (props) => {
  const { loginToServer } = props;
  let logincount = 0;

  if (
    !_.get(store.getState(), "auth.user.id") &&
    _.get(store.getState(), "auth.jwt")
  ) {
    logincount++;
    if (logincount == 10) {
      alert("There is an error logging you in, try again");
      store.dispatch({ type: "LOGOUT" });
      logincount = 0;
    }
    loginToServer().then(({ data }) => {
      store.dispatch({ type: "SET_USER_ID", id: data.login.id });
    });
  }

  return (
    <main className="container main-page">
      <Switch>
        <Route exact path="/" component={LoginSplashPage} />
        <Route path="/dashboard" component={HomePageContainer} />
        <Route
          path="/callback"
          render={(props) => (
            <AuthCallback loginToServer={loginToServer} {...props} />
          )}
        />
        <Route exact path="/privacy" component={PrivacyPolicyPage} />
        <Route
          path="/projects"
          component={() => (
            <Switch>
              <Route exact path="/projects" component={HomePageContainer} />
              <Route
                path="/projects/:id"
                component={ProjectPageContainer}
                props={props}
              />
            </Switch>
          )}
        />
      </Switch>
    </main>
  );
};

export default compose(login)(Main);
