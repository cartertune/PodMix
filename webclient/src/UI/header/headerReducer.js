import _ from "lodash";

const defaultState = {};

const headerReducer = (state = defaultState, action) => {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    default:
  }
  return newState;
};

export default headerReducer;
