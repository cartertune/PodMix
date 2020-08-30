import _ from "lodash";
import { connect } from "react-redux";
import { compose } from "react-apollo";
import {
  getProject,
  addMix,
  addComment,
} from "../../connections/projectConnections";
import { withRouter } from "react-router-dom";
import ProjectPage from "./ProjectPage";

const mapStateToProps = (state, ownProps) => ({
  ...state.projectPage,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  openMixModal: ({ defaultMixNum }) => {
    dispatch({ type: "OPEN_ADD_MIX_MODAL", defaultMixNum });
  },
  closeMixModal: () => dispatch({ type: "CLOSE_ADD_MIX_MODAL" }),
  editMixModalField: ({ field, value }) => {
    dispatch({ type: "EDIT_ADD_MIX_MODAL_FIELD", field, value });
  },

  // TODO: NOT DONE
  addMix: ({ title }) => {
    const { addMix, project } = ownProps;
    dispatch({ type: "ADDING_MIX" });
    addMix({ title, fileUrl }).then((res) => {
      dispatch({ type: "CREATE_PROJECT_SUCCESS" });
    });
  },
  addComment: ({ mixId, text }) => {
    const { addComment, project } = ownProps;
    dispatch({ type: "ADDING_COMMENT" });
    addComment({ text });
  },
});

export default withRouter(
  compose(
    getProject,
    // addMix,
    // addComment,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(ProjectPage)
);
