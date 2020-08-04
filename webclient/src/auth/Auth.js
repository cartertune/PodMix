import auth0 from "auth0-js";
import { store, persistor } from "../store";

const isBrowser = typeof window !== "undefined";

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.AUTH_DOMAIN,
      clientID: process.env.AUTH_CLIENT_ID,
      redirectUri: process.env.AUTH_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email"
    });
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    //this.scheduleRenewal();
  }

  login({ callbackLink }) {
    store.dispatch({ type: "SET_CALLBACK_LINK", callbackLink });
    this.auth0.authorize();
    //this.scheduleRenewal();
  }

  logout() {
    // Clear access token and ID token from local storage
    store.dispatch({ type: "LOGOUT" });
    clearTimeout(this.tokenRenewalTimeout);
    // history.replace("/");
  }

  handleAuthentication(history, callback) {
    if (isBrowser) {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult, callback);
          const callbackLink = this.getAuthState().callbackLink;
          history.push(callbackLink);
          // history.replace("/");
        } else if (err) {
          //history.replace("/");
          console.log("error:", err, authResult);
        }
      });
    }
  }

  getAuthState() {
    const state = store.getState();

    if (state) {
      return state.auth;
    }
    return {};
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = this.getAuthState.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  setSession(authResult, callback) {
    const { dispatch } = store;

    if (!dispatch) {
      throw new Error("Dispatch needed to set auth session");
    }
    const { accessToken, idToken } = authResult;

    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      dispatch({ type: "SET_SESSION", accessToken, user, idToken, expiresAt });
      callback();
      //history.replace("/");
    });
  }

  getUser() {
    const state = this.getAuthState();
    return state.user;
  }

  getUserName() {
    if (this.getUser()) {
      return this.getUser().name;
    }
  }

  getAccessToken() {
    const accessToken = this.getAccessToken().accessToken;
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  }
}

export default new Auth();
