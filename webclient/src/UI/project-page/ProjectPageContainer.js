import _ from "lodash";
import { connect } from "react-redux";
import { compose } from "react-apollo";
import { signS3Url } from "../../connections/miscConnections";
import { addMix, getProject } from "../../connections/projectConnections";
import { withRouter } from "react-router-dom";
import ProjectPage from "./ProjectPage";
import { uploadBase64ToS3 } from "../../util/util";

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
  handleSelectMix: ({ value, defaultMixNum }) => {
    if (value === "NEW_MIX") {
      dispatch({ type: "OPEN_ADD_MIX_MODAL", defaultMixNum });
    } else {
      dispatch({ type: "SELECT_MIX", mixId: value });
    }
  },
  // TODO: NOT DONE
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
    // Save the URL of photo to this event.
    // addMix({ title, fileUrl }).then((res) => {
    //   dispatch({ type: "CREATE_PROJECT_SUCCESS" });
    // });
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
    signS3Url,
    addMix,
    // addComment,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(ProjectPage)
);
