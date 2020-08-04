import React, { Component } from "react";
import _ from "lodash";
import Auth from "./Auth";
import { store } from "../store";
import { LoadingScreen } from "../UI/components/Loading";

class AuthCallback extends Component {
  //Auth.handleAuthentication(props.history);
  componentDidMount() {
    const { history, loginToServer } = this.props;
    const handleAuthCallback = () => {
      loginToServer()
        .then(({ data }) => {
          const dispatch = _.get(store, "dispatch");
          if (dispatch) {
            dispatch({ type: "SET_USER_ID", id: data.login.id });
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    Auth.handleAuthentication(history, handleAuthCallback);
  }

  render() {
    return <LoadingScreen />;
  }
}

export default AuthCallback;
