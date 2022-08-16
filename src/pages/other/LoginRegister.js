import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, Redirect } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import {
  authenticate,
  signin,
  signup,
  isAuthenticated,
} from "../../helpers/auth";
import Googlebutton from "../../components/googlelogin/Googlebutton";

const LoginRegister = ({ location }) => {
  const { pathname } = location;
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const PerformRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const { username, email, password } = values;
  const [text, setText] = useState(false);
  const handleChange = (key) => (event) => {
    setValues({ ...values, [key]: event.target.value });
  };
  const onRegister = (event) => {
    event.preventDefault();
    if (!username || !email) {
      setErrorRegister(true);
      setErrorMsg("Fields cannot be blank");
      return;
    }
    if (password.length < 5) {
      setErrorRegister(true);
      setText(true);
      return;
    }
    signup({ username, email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.email != email) {
          setErrorRegister(true);
          setText(false);
          setErrorMsg(data.email);
        } else {
          setSuccessRegister(true);
          document.getElementById("loginbuuton").click();
        }
      })
      .catch((e) => console.log(e));
  };
  const [reload, setReload] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {}, [reload]);
  const errorMessageLogin = () => {
    return (
      <div className="row">
        <div className="col-md text-left">
          <div
            className="alert alert-danger"
            style={{ display: errorLogin ? "" : "none" }}
          >
            {errorMsg}
          </div>
        </div>
      </div>
    );
  };
  const errorMessageRegister = () => {
    return (
      <div className="row">
        <div className="col-md text-left">
          <div
            className="alert alert-danger"
            style={{ display: errorRegister ? "" : "none" }}
          >
            {!text ? errorMsg : "Password should be greater than 5 characters"}
          </div>
        </div>
      </div>
    );
  };
  const onLogin = (event) => {
    event.preventDefault();

    signin({ email, password })
      .then((data) => {
        if (data.token) {
          authenticate(data, () => {
            console.log("token added");
          });
          setReload(!reload);
          window.location.reload();
        } else {
          setErrorLogin(true);
          setErrorMsg(data.error);
        }

        console.log("DATA:", data);
      })
      .catch((e) => console.log(e));
  };
  const successMessageRegister = () => {
    return (
      <div className="row">
        <div className="col-md offset-sm text-left">
          <div
            className="alert alert-success"
            style={{ display: successRegister ? "" : "none" }}
          >
            New Account Created Successfully.Please Login Now
          </div>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Darzi Warzi|Login</title>
        <meta name="description" content="Compare page of Darzi Warzi." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form id="loginform">
                              {errorMessageLogin()}
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={handleChange("email")}
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                value={password}
                                onChange={handleChange("password")}
                              />

                              <div className="button-box col-8">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/forgot-password"
                                    }
                                  >
                                    Forgot Password?
                                  </Link>
                                </div>
                              </div>
                              <div className="row">
                                <div className="button-box col-8">
                                  <button
                                    id="loginbuuton"
                                    type="submit"
                                    onClick={onLogin}
                                  >
                                    <span>Login</span>
                                  </button>
                                </div>

                                <div className="button-box col-4">
                                  <Googlebutton />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              {errorMessageRegister()}
                              {successMessageRegister()}
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                value={username}
                                onChange={handleChange("username")}
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password should be greater than 5 characters"
                                value={password}
                                onChange={handleChange("password")}
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={handleChange("email")}
                              />
                              <div className="row">
                                <div className="button-box col-8">
                                  <button type="submit" onClick={onRegister}>
                                    <span>Register</span>
                                  </button>
                                </div>
                                <div className="button-box col-4">
                                  <Googlebutton />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <p className="text-center">{JSON.stringify(values)}</p> */}
      </LayoutOne>
      {PerformRedirect()}
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;
