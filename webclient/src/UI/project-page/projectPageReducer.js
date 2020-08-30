import _ from "lodash";

const defaultState = {
  isMixModalOpen: false,
  mixModalData: {
    title: "",
  },
};

const projectPageReducer = (state = defaultState, action) => {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case "OPEN_MIX_MODAL":
      newState.isMixModalOpen = true;
      break;
    case "CLOSE_MIX_MODAL":
      newState.isMixModalOpen = false;
      newState.mixModalData = defaultState.mixModalData;
      break;
    case "EDIT_MIX_MODAL_FIELD":
      newState.mixModalData[action.field] = action.value;
      break;
    default:
  }
  return newState;
};

export default projectPageReducer;
