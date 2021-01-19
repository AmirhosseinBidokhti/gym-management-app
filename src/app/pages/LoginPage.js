import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import Spinner from "../vendor/shared/Spinner";

const LoginPage = ({ history, location }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  //const redirect = location.search ? location.search.split("=")[1] : "";
  const redirect = "/dashboard";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const sumbitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div>
      <div
        className="d-flex align-items-center auth px-0"
        style={{
          direction: "ltr",

          backgroundPosition: "left",
          backgroundSize: "cover",
          backgroundImage:
            "linear-gradient(90deg, rgba(65,65,66,0.3561799719887955) 100%, rgba(124,125,123,1) 100%, rgba(0,212,255,1) 100%),url(https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1094&q=80) ",
        }}
      >
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              {/* <div className="brand-logo">
                <img
                  src={require("../assets/added-ones/gym-logo.png")}
                  alt="logo"
                  style={{ width: "61px", marginBottom: "-10px" }}
                />{" "}
              </div> */}
              {loading ? (
                <Spinner />
              ) : (
                <div>
                  {" "}
                  <div>
                    {" "}
                    <h3 className="font-weight-light">IMOTION FITCLUB</h3>
                    <h7 className="font-weight-light">
                      Sign In and let's get to work!
                    </h7>
                  </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <Form className="pt-3" onSubmit={sumbitHandler}>
                    <Form.Group className="d-flex search-field">
                      <Form.Control
                        type="name"
                        placeholder="Username"
                        size="lg"
                        className="h-auto"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="d-flex search-field">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        size="lg"
                        className="h-auto"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      >
                        SIGN IN
                      </button>
                    </div>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
