import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";

const mapStateToProps = (state, ownProps) => ({
  ...state.auth,
  ...state.header
});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
