import _ from "lodash";
import { connect } from "react-redux";
import { compose } from "react-apollo";
import { signS3Url } from "../../connections/miscConnections";
import {
  addMix,
  addComment,
  addCollaborator,
  getProject,
  deleteComment,
} from "../../connections/projectConnections";
import { withRouter } from "react-router-dom";
import ProjectPage from "./ProjectPage";
import { uploadBase64ToS3 } from "../../util/util";

const mapStateToProps = (state, ownProps) => ({
  ...state.projectPage,
  ...state.auth,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  openMixModal: ({ defaultMixNum }) => {
    dispatch({ type: "OPEN_ADD_MIX_MODAL", defaultMixNum });
  },
  closeMixModal: () => dispatch({ type: "CLOSE_ADD_MIX_MODAL" }),
  editMixModalField: ({ field, value }) => {
    dispatch({ type: "EDIT_ADD_MIX_MODAL_FIELD", field, value });
  },
  openCommentModal: () => {
    dispatch({ type: "OPEN_ADD_COMMENT_MODAL" });
  },
  closeCommentModal: () => dispatch({ type: "CLOSE_ADD_COMMENT_MODAL" }),
  editCommentModalField: ({ field, value }) => {
    dispatch({ type: "EDIT_ADD_COMMENT_MODAL_FIELD", field, value });
  },
  openCollaboratorModal: () => {
    dispatch({ type: "OPEN_ADD_COLLABORATOR_MODAL" });
  },
  closeCollaboratorModal: () =>
    dispatch({ type: "CLOSE_ADD_COLLABORATOR_MODAL" }),
  editCollaboratorModalField: ({ field, value }) => {
    dispatch({ type: "EDIT_ADD_COLLABORATOR_MODAL_FIELD", field, value });
  },
  handleSelectMix: ({ value, defaultMixNum }) => {
    if (value === "NEW_MIX") {
      dispatch({ type: "OPEN_ADD_MIX_MODAL", defaultMixNum });
    } else {
      dispatch({ type: "SELECT_MIX", mixId: value });
    }
  },
  handleTogglePlay: () => {
    dispatch({ type: "TOGGLE_PLAY_PAUSE" });
  },
  handlePosChange: (pos) => {
    dispatch({ type: "SET_AUDIO_POSITION", pos });
  },
  handleCommentClick: (pos) => {
    dispatch({ type: "SET_AUDIO_POSITION", pos: _.floor(pos, 1) });
  },
  addMix: ({ title, file }) => {
    const { addMix, signS3Url, project } = ownProps;
    dispatch({ type: "ADDING_MIX" });
    signS3Url(file.type)
      .then(({ data }) => {
        const signedUrl = _.get(data, "signS3Url.url");
        const signedRequest = _.get(data, "signS3Url.signedRequest");

        const mix = {
          title,
          fileUrl: signedUrl,
          fileName: file.name,
        };
        // Save the URL of photo to this event.
        uploadBase64ToS3(signedRequest, file)
          // Success!!
          .then((res) => {
            addMix(project.id, mix).then((res) => {
              dispatch({
                type: "ADD_MIX_SUCCESS",
              });
              const newMixId = _.last(_.get(res, "data.addMix.mixes")).id;
              dispatch({
                type: "SELECT_MIX",
                mixId: newMixId,
              });
              dispatch({
                type: "CLOSE_ADD_MIX_MODAL",
              });
            });
          })
          .catch((err) => {
            console.log("Error: uploadToS3");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("signS3Url");
        console.log(err);
      });
  },
  addComment: ({ mixId, text, audioPosition }) => {
    const { addComment, project } = ownProps;
    dispatch({ type: "ADDING_COMMENT" });
    const comment = {
      time: _.floor(audioPosition),
      text,
    };
    addComment({ comment, mixId, projectId: project.id }).then(() => {
      dispatch({ type: "ADD_COMMENT_SUCCESS" });
      dispatch({ type: "CLOSE_ADD_COMMENT_MODAL" });
    });
  },
  deleteComment: ({ mixId, commentId }) => {
    const { deleteComment, project } = ownProps;

    if (
      confirm(
        "Are you sure you want to delete this comment? It cannot be undone."
      )
    ) {
      deleteComment({ projectId: project.id, commentId, mixId });
    }
  },
  addCollaborator: ({ email }) => {
    const { addCollaborator, project } = ownProps;
    dispatch({ type: "ADDING_COLLABORATOR" });
    addCollaborator({ projectId: project.id, email }).then((project) =>
      dispatch({ type: "ADD_COLLABORATOR_SUCCESS" })
    );
  },
});

export default withRouter(
  compose(
    getProject,
    signS3Url,
    addMix,
    addComment,
    deleteComment,
    addCollaborator,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(ProjectPage)
);
