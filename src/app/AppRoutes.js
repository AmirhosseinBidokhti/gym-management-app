import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./utils/privateRoute";
import LoginPage from "./pages/LoginPage";
import { CustomerAddPage } from "./pages/CustomerAddPage";
//import { CustomersPage } from "./pages/CustomersPage";
import { CustomerCheckupPage } from "./pages/CustomerCheckupPage";
import { ProductAddPage } from "./pages/ProductAddPage";
import { ProductsPage } from "./pages/ProductsPage";
import { SaleInvoiceAddPage } from "./pages/SaleInvoiceAddPage";
import { SaleInvoicesPage } from "./pages/SaleInvoicesPage";

import Spinner from "./vendor/shared/Spinner";
import { CustomerEditPage } from "./pages/CustomerEditPage";
import { TransactionAddPage } from "./pages/TransactionAddPage";
import { TransactionsPage } from "./pages/TransactionsPage";

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
          <PrivateRoute
            exact={true}
            path="/customer/edit-customer/:id"
            component={CustomerEditPage}
          />
          <PrivateRoute
            exact={true}
            path="/product/add-new-product"
            component={ProductAddPage}
          />
          <PrivateRoute
            exact={true}
            path="/product/product-list"
            component={ProductsPage}
          />

          <PrivateRoute
            exact={true}
            path="/saleInvoice/add-new-saleInvoice"
            component={SaleInvoiceAddPage}
          />
          <PrivateRoute
            exact={true}
            path="/saleInvoice/saleInvoice-list"
            component={SaleInvoicesPage}
          />
          <PrivateRoute
            exact={true}
            path="/transaction/add-new-transaction"
            component={TransactionAddPage}
          />
          <PrivateRoute
            exact={true}
            path="/transaction/transaction-list"
            component={TransactionsPage}
          />
          <Route exact={true} path="/" component={LoginPage} />
          <Route path="*" component={Error404} />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;