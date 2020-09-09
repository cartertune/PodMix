import _ from "lodash";

const defaultState = {
  isMixModalOpen: false,
  selectedMixId: "",
  mixModalData: {
    title: "",
    tempAudio: null,
    audioToUpload: null,
    file: null,
  },
  commentModalData: {
    text: "",
  },
  isPlaying: false,
  audioPosition: 0,
};

const projectPageReducer = (state = defaultState, action) => {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case "TOGGLE_PLAY_PAUSE":
      newState.isPlaying = !newState.isPlaying;
      break;
    case "SET_AUDIO_POSITION":
      newState.audioPosition = action.pos;
      break;
    case "SELECT_MIX":
      newState.selectedMixId = action.mixId;
      break;
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
    case "OPEN_ADD_COMMENT_MODAL":
      newState.isCommentModalOpen = true;
      break;
    case "CLOSE_ADD_COMMENT_MODAL":
      newState.isCommentModalOpen = false;
      newState.commentModalData = defaultState.commentModalData;
      break;
    case "EDIT_ADD_COMMENT_MODAL_FIELD":
      newState.commentModalData[action.field] = action.value;
      break;
    default:
  }
  return newState;
};

export default projectPageReducer;
