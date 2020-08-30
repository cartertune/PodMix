import _ from "lodash";
import { connect } from "react-redux";
import { compose } from "react-apollo";
import { createProject } from "../../connections/projectConnections";
import { withRouter } from "react-router-dom";
import HomePage from "../home-page/HomePage";

const mapStateToProps = (state, ownProps) => ({
  ...state.homePage,
  ...state.auth,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  openCreateModal: () => {
    dispatch({ type: "OPEN_CREATE_MODAL" });
  },
  closeCreateModal: () => dispatch({ type: "CLOSE_CREATE_MODAL" }),
  editCreateModalField: ({ field, value }) => {
    dispatch({ type: "EDIT_CREATE_PROJECT_MODAL_FIELD", field, value });
  },
  createProject: ({ title }) => {
    const { createProject, history } = ownProps;
    dispatch({ type: "CREATING_PROJECT", title });
    createProject({ title }).then((res) => {
      dispatch({ type: "CREATE_PROJECT_SUCCESS" });
      history.push("/projects/" + _.get(res, "data.createProject.id"));
    });
  },
});

export default withRouter(
  compose(
    createProject,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(HomePage)
);