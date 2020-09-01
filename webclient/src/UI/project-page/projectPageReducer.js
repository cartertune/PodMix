import _ from "lodash";

const defaultState = {
  isMixModalOpen: false,
  mixModalData: {
    title: "",
    tempAudio: null,
    audioToUpload: null,
    file: null,
  },
};

const projectPageReducer = (state = defaultState, action) => {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case "OPEN_ADD_MIX_MODAL":
      newState.isMixModalOpen = true;
      newState.mixModalData.title = "Mix " + action.defaultMixNum;
      break;
    case "CLOSE_ADD_MIX_MODAL":
      newState.isMixModalOpen = false;
      newState.mixModalData = defaultState.mixModalData;
      break;
    case "EDIT_ADD_MIX_MODAL_FIELD":
      newState.mixModalData[action.field] = action.value;
      break;
    default:
  }
  return newState;
};

export default projectPageReducer;
