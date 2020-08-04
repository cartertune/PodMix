import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

const routes = [
  {
    title: "Create",
    link: "/create"
  }
];

const Header = props => {
  const currentRoute = _.get(props, "location.pathname");
  const { logout } = props;

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-div">
          <Link className="header-logo" to="/">
            {/* <img src={logo} /> */}
          </Link>
          {_.map(routes, route => {
            return (
              <Link
                className={currentRoute === route.link ? "selected-route" : ""}
                to={route.link}
                key={route.link}
              >
                {route.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
