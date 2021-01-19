import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  getUserInfo() {
    const userName = JSON.parse(localStorage.getItem("userInfo")).username;
    const role = JSON.parse(localStorage.getItem("userInfo")).role;
    return {
      username: userName,
      userRole: role,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/customer", state: "customerMenuOpen" },
      { path: "/product", state: "productMenuOpen" },
      { path: "/saleInvoice", state: "saleInvoiceMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="index.html">
            <img src={require("../../assets/images/logo.svg")} alt="logo" />
          </a>
          <a className="sidebar-brand brand-logo-mini" href="index.html">
            <img
              src={require("../../assets/images/logo-mini.svg")}
              alt="logo"
            />
          </a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img
                    className="img-xs rounded-circle "
                    src={require("../../assets/images/faces/face15.jpg")}
                    alt="profile"
                  />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">
                    {this.getUserInfo().username}
                  </h5>
                  <span>{this.getUserInfo().userRole}</span>
                </div>
              </div>
              {/* <Dropdown alignLeft>
                <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a
                    href="!#"
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">
                        <Trans>Account settings</Trans>
                      </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    href="!#"
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">
                        <Trans>Change Password</Trans>
                      </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    href="!#"
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">
                        <Trans>To-do list</Trans>
                      </p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">پنل مدیریت</span>
          </li>
          <li
            className={
              this.isPathActive("/dashboard")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">داشبورد</span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/customer")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.customerMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("customerMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-account-multiple"></i>
              </span>
              <span className="menu-title">مشتری</span>
              <i
                className="mdi mdi-chevron-down"
                style={{ marginRight: "auto" }}
              ></i>
            </div>
            <Collapse in={this.state.customerMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/customer/add-new-customer")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/customer/add-new-customer"
                    >
                      <i
                        className="mdi mdi-account-plus"
                        style={{ marginLeft: "5px", marginTop: "3px" }}
                      ></i>{" "}
                      ایجاد مشتری
                    </Link>
                  </li>

                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/customer/customers-list")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/customer/customers-list"
                    >
                      <i
                        className="mdi mdi-account-search"
                        style={{ marginLeft: "5px", marginTop: "3px" }}
                      ></i>{" "}
                      لیست مشتریان
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/product")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.productMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("productMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-run"></i>
              </span>
              <span className="menu-title">محصولات</span>
              <i
                className="mdi mdi-chevron-down"
                style={{ marginRight: "auto" }}
              ></i>
            </div>
            <Collapse in={this.state.productMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/product/add-new-product")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/product/add-new-product"
                    >
                      <i
                        className="mdi mdi-new-box"
                        style={{ marginLeft: "5px", marginTop: "3px" }}
                      ></i>{" "}
                      ایجاد محصول جدید
                    </Link>
                  </li>

                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/product/product-list")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/product/product-list"
                    >
                      <i
                        className="mdi mdi-file-multiple"
                        style={{ marginLeft: "5px", marginTop: "3px" }}
                      ></i>{" "}
                      لیست محصولات
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/saleInvoice")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.saleInvoiceMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("saleInvoiceMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-file-document"></i>
              </span>
              <span className="menu-title">فاکتور فروش</span>
              <i
                className="mdi mdi-chevron-down"
                style={{ marginRight: "auto" }}
              ></i>
            </div>
            <Collapse in={this.state.saleInvoiceMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/saleInvoice/add-new-saleInvoice")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/saleInvoice/add-new-saleInvoice"
                    >
                      <i
                        className="mdi mdi-new-box"
                        style={{ marginLeft: "5px", marginTop: "3px" }}
                      ></i>{" "}
                      ایجاد فاکتور فروش جدید
                    </Link>
                  </li>

                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/saleInvoice/saleInvoice-list")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/saleInvoice/saleInvoice-list"
                    >
                      <i
                        className="mdi mdi-file-multiple"
                        style={{ marginLeft: "5px", marginTop: "3px" }}
                      ></i>{" "}
                      لیست فاکتور
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/product")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.productMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("productMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-run"></i>
              </span>
              <span className="menu-title">محصولات</span>
              <i
                className="mdi mdi-chevron-down"
                style={{ marginRight: "auto" }}
              ></i>
            </div>
            <Collapse in={this.state.productMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/product/add-new-product")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/product/add-new-product"
                    >
                      <i
                        className="mdi mdi-new-box"
                        style={{ marginLeft: "5px", marginTop: "3px" }}
                      ></i>{" "}
                      ایجاد محصول جدید
                    </Link>
                  </li>

                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/product/product-list")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/product/product-list"
                    >
                      <i
                        className="mdi mdi-file-multiple"
                        style={{ marginLeft: "5px", marginTop: "3px" }}
                      ></i>{" "}
                      لیست محصولات
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
