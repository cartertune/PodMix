import _ from "lodash";
import { connect } from "react-redux";
import { compose } from "react-apollo";
import { createProject } from "../../connections/projectConnections";
import { withRouter } from "react-router-dom";
import HomePage from "../dashboard/HomePage";
import { getCurrentUser } from "../../connections/userConnections";
import Auth from "../../auth/Auth";

const mapStateToProps = (state, ownProps) => ({
  ...state.homePage,
  ...state.auth,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  openCreateModal: () => {
    const { history } = ownProps;
    dispatch({ type: "OPEN_CREATE_MODAL" });
    history.push("/dashboard/create-project");
  },
  closeCreateModal: () => {
    const { history } = ownProps;
    dispatch({ type: "CLOSE_CREATE_MODAL" });
    history.goBack();
  },
  editCreateModalField: ({ field, value }) => {
    dispatch({ type: "EDIT_CREATE_PROJECT_MODAL_FIELD", field, value });
  },
  createProject: ({ title }) => {
    const { createProject, history } = ownProps;
    dispatch({ type: "CREATING_PROJECT", title });
    createProject({ title }).then((res) => {
      dispatch({ type: "CREATE_PROJECT_SUCCESS" });
      dispatch({ type: "CLOSE_CREATE_MODAL" });
      history.push("/projects/" + _.get(res, "data.createProject.id"));
    });
  },
  logout: () => {
    Auth.logout();
  },
});

export default withRouter(
  compose(
    getCurrentUser,
    createProject,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(HomePage)
);
