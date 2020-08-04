import _ from "lodash";

const defaultState = {
  accessToken: "",
  jwt: "",
  expiresAt: "",
  user: {},
  callbackLink: "/"
};

const authReducer = (state = defaultState, action) => {
  let newState = _.cloneDeep(state);

  switch (action.type) {
    case "persist/REHYDRATE":
      const isExpired =
        new Date().getTime() > _.get(action, "payload.auth.expires_at");
      if (isExpired) {
        return newState;
      }
      return _.get(action, "payload.auth", newState);
    case "SET_CALLBACK_LINK":
      newState.callbackLink = action.callbackLink;
      break;
    case "SET_SESSION":
      newState.accessToken = action.accessToken;
      newState.jwt = action.idToken;
      newState.expiresAt = action.expiresAt;
      newState.user = action.user || {};
      break;
    case "SET_USER_ID":
      if (!newState.user) {
        newState.user = {};
      }
      newState.user.id = action.id;
      break;
    case "LOGOUT":
      newState = defaultState;
      break;
    default:
  }
  return newState;
};

export default authReducer;
