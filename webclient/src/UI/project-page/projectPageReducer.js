import _ from "lodash";

const defaultState = {
  isMixModalOpen: false,
  isCommentModalOpen: false,
  isCollaboratorModalOpen: false,
  isAddingMix: false,
  isAddingComment: false,
  isAddingCollaborator: false,
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
  collaboratorModalData: {
    email: "",
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
      newState.isAddingMix = false;
      break;
    case "EDIT_ADD_MIX_MODAL_FIELD":
      newState.mixModalData[action.field] = action.value;
      break;
    case "ADDING_MIX":
      newState.isAddingMix = true;
      break;
    case "OPEN_ADD_COMMENT_MODAL":
      newState.isCommentModalOpen = true;
      break;
    case "CLOSE_ADD_COMMENT_MODAL":
      newState.isCommentModalOpen = false;
      newState.commentModalData = defaultState.commentModalData;
      newState.isAddingComment = false;
      break;
    case "EDIT_ADD_COMMENT_MODAL_FIELD":
      newState.commentModalData[action.field] = action.value;
      break;
    case "ADDING_COMMENT":
      newState.isAddingComment = true;
      break;
    case "OPEN_ADD_COLLABORATOR_MODAL":
      newState.isCollaboratorModalOpen = true;
      break;
    case "CLOSE_ADD_COLLABORATOR_MODAL":
      newState.isCollaboratorModalOpen = false;
      newState.collaboratorModalData = defaultState.collaboratorModalData;
      break;
    case "EDIT_ADD_COLLABORATOR_MODAL_FIELD":
      newState.collaboratorModalData[action.field] = action.value;
      break;
    case "ADDING_COLLABORATOR":
      newState.collaboratorModalData = defaultState.collaboratorModalData;
      newState.isAddingCollaborator = true;
      break;
    case "ADD_COLLABORATOR_SUCCESS":
      newState.isAddingCollaborator = false;
      break;
    default:
  }
  return newState;
};

export default projectPageReducer;
