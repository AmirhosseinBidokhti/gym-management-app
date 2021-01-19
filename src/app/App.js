import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import Navbar from "./vendor/shared/Navbar";
import Sidebar from "./vendor/shared/Sidebar";
//import Footer from "./vendor/shared/Footer";
import { withTranslation } from "react-i18next";
import { isAuth } from "./utils/checkAuth";
class App extends Component {
  state = {};
  componentDidMount() {
    this.onRouteChanged();
  }
  render() {
    let navbarComponent =
      !this.state.isFullPageLayout && isAuth() ? <Navbar /> : "";
    let sidebarComponent =
      !this.state.isFullPageLayout && isAuth() ? <Sidebar /> : "";
    //let footerComponent = !this.state.isFullPageLayout ? <Footer /> : "";
    return (
      <div className="container-scroller">
        {sidebarComponent}
        <div className="container-fluid page-body-wrapper">
          <div className="main-panel">
            {navbarComponent}
            <div className="content-wrapper">
              <AppRoutes />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    const { i18n } = this.props;
    const body = document.querySelector("body");
    if (this.props.location.pathname === "/layout/RtlLayout") {
      body.classList.add("rtl");
      i18n.changeLanguage("ar");
    } else {
      body.classList.add("rtl");
      i18n.changeLanguage("en");
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [
      "/user-pages/login-1",
      "/user-pages/login-2",
      "/user-pages/register-1",
      "/user-pages/register-2",
      "/user-pages/lockscreen",
      "/error-pages/error-404",
      "/error-pages/error-500",
      "/general-pages/landing-page",
      // added by me
      "/login",
      "/",
    ];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.add("full-page-wrapper");
        break;
      } else {
        this.setState({
          isFullPageLayout: false,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.remove("full-page-wrapper");
      }
    }
  }
}

export default withTranslation()(withRouter(App));
