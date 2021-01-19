import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
  // performValidationHere(); return condition;
  const authenticated = localStorage.getItem("userInfo");

  return authenticated ? (
    <Route path={props.path} component={props.component} exact={props.exact} />
  ) : (
    <Redirect to="/" />
  );
};
export default PrivateRoute;
