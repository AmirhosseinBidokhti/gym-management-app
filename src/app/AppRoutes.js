import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./utils/privateRoute";
import LoginPage from "./pages/LoginPage";
import { CustomerAddPage } from "./pages/CustomerAddPage";
//import { CustomersPage } from "./pages/CustomersPage";
import { CustomerCheckupPage } from "./pages/CustomerCheckupPage";

import Spinner from "./vendor/shared/Spinner";

const CustomersPage = lazy(() => import("./pages/CustomersPage"));

const Dashboard = lazy(() => import("./vendor/dashboard/Dashboard"));

const Error404 = lazy(() => import("./vendor/error-pages/Error404"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={Spinner}>
        <Switch>
          <PrivateRoute exact={true} path="/dashboard" component={Dashboard} />
          <PrivateRoute
            path="/customer/customers-list"
            component={CustomersPage}
          />
          <PrivateRoute
            path="/customer/add-new-customer"
            component={CustomerAddPage}
          />
          <PrivateRoute
            exact={true}
            path="/customer/customer-checkup/:id"
            component={CustomerCheckupPage}
          />

          <Route exact={true} path="/" component={LoginPage} />
          <Route path="*" component={Error404} />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
