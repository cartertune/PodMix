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
  completeComment,
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
    const { history, project } = ownProps;
    dispatch({ type: "OPEN_ADD_MIX_MODAL", defaultMixNum });
    history.push(`${project.id}/add-mix`);
  },
  closeMixModal: () => {
    const { history } = ownProps;
    dispatch({ type: "CLOSE_ADD_MIX_MODAL" });
    history.goBack();
  },
  editMixModalField: ({ field, value }) => {
    dispatch({ type: "EDIT_ADD_MIX_MODAL_FIELD", field, value });
  },
  openCommentModal: () => {
    const { history, project } = ownProps;
    dispatch({ type: "OPEN_ADD_COMMENT_MODAL" });
    history.push(`${project.id}/add-comment`);
  },
  closeCommentModal: () => {
    const { history } = ownProps;
    dispatch({ type: "CLOSE_ADD_COMMENT_MODAL" });
    history.goBack();
  },
  editCommentModalField: ({ field, value }) => {
    dispatch({ type: "EDIT_ADD_COMMENT_MODAL_FIELD", field, value });
  },
  openCollaboratorModal: () => {
    const { history, project } = ownProps;
    dispatch({ type: "OPEN_ADD_COLLABORATOR_MODAL" });
    history.push(`${project.id}/add-collaborator`);
  },
  closeCollaboratorModal: () => {
    const { history } = ownProps;
    dispatch({ type: "CLOSE_ADD_COLLABORATOR_MODAL" });
    history.goBack();
  },
  editCollaboratorModalField: ({ field, value }) => {
    dispatch({ type: "EDIT_ADD_COLLABORATOR_MODAL_FIELD", field, value });
  },
  handleSelectMix: ({ value }) => {
    dispatch({ type: "SELECT_MIX", mixId: value });
  },
  handleTogglePlay: () => {
    dispatch({ type: "TOGGLE_PLAY_PAUSE" });
  },
  handlePosChange: (pos) => {
    dispatch({ type: "SET_AUDIO_POSITION", pos });
  },
  handleCommentClick: (comment) => {
    const { time, id } = comment;
    dispatch({ type: "SELECT_COMMENT", commentId: id });
    dispatch({ type: "SET_AUDIO_POSITION", pos: _.floor(time, 1) });
  },
  addMix: ({ title, file }) => {
    const { addMix, signS3Url, project, history } = ownProps;
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
        uploadBase64ToS3(signedRequest, file, (perc) =>
          dispatch({ type: "UPLOAD_PERC", perc })
        )
          // Success!!
          .then((res) => {
            addMix(project.id, mix).then((mixRes) => {
              dispatch({
                type: "ADD_MIX_SUCCESS",
              });
              const newMixId = _.last(_.get(mixRes, "data.addMix.mixes")).id;
              dispatch({
                type: "SELECT_MIX",
                mixId: newMixId,
              });
              dispatch({
                type: "CLOSE_ADD_MIX_MODAL",
              });
              history.goBack();
            });
          })
          .catch((err) => {
            alert(
              "MIX UPLOAD FAILED: This large of a file needs to be uploaded on a faster network"
            );
            console.log("Error: uploadToS3");
            console.log(err);
            dispatch({
              type: "CLOSE_ADD_MIX_MODAL",
            });
          });
      })
      .catch((err) => {
        console.log("signS3Url");
        console.log(err);
      });
  },
  addComment: ({ mixId, text, audioPosition }) => {
    const { addComment, project, history } = ownProps;
    dispatch({ type: "ADDING_COMMENT" });
    const comment = {
      time: _.floor(audioPosition),
      text,
    };
    addComment({ comment, mixId, projectId: project.id }).then(() => {
      dispatch({ type: "ADD_COMMENT_SUCCESS" });
      dispatch({ type: "CLOSE_ADD_COMMENT_MODAL" });
      history.goBack()
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
  completeComment: ({ mixId, commentId }) => {
    const { completeComment, project } = ownProps;

    completeComment({ projectId: project.id, commentId, mixId });
  },
  addCollaborator: ({ email }) => {
    const { addCollaborator, project, history } = ownProps;
    dispatch({ type: "ADDING_COLLABORATOR" });
    addCollaborator({ projectId: project.id, email }).then((project) => {
      dispatch({ type: "ADD_COLLABORATOR_SUCCESS" })
      dispatch({type: "CLOSE_COLLABORATOR_MODAL"})
      history.goBack()
    });
  },
});

export default withRouter(
  compose(
    getProject,
    signS3Url,
    addMix,
    addComment,
    deleteComment,
    completeComment,
    addCollaborator,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(ProjectPage)
);
