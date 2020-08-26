import React from "react";
import { connect } from "react-redux";
import Auth from "../../auth/Auth";
import LoginSplashPage from "./LoginSplashPage";

const HomePage = (props) => {
  if (!Auth.isLoggedIn()) {
    return <LoginSplashPage {...props} />;
  }

  return (
    <div className="home-page">
      <div className="row justify-content-center mt-4">
        <button className="btn btn-primary col-8 py-4">
          <h3>Create New Project</h3>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...state.auth,
});
export default connect(
  mapStateToProps,
  null
)(HomePage);
