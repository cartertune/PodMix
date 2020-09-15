import _ from "lodash";

const defaultState = {
  isCreateModalOpen: false,
  isCreatingProject: false,
  createModalData: {
    title: "",
  },
};

const homePageReducer = (state = defaultState, action) => {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case "OPEN_CREATE_MODAL":
      newState.isCreateModalOpen = true;
      break;
    case "CLOSE_CREATE_MODAL":
      newState.isCreateModalOpen = false;
      newState.createModalData = defaultState.createModalData;
      newState.isCreatingProject = false;
      break;
    case "CREATING_PROJECT":
      newState.isCreatingProject = true;
      break;
    case "EDIT_CREATE_PROJECT_MODAL_FIELD":
      newState.createModalData[action.field] = action.value;
      break;
    default:
  }
  return newState;
};

export default homePageReducer;
