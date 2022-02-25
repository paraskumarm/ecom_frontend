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

const LoginRegister = ({ location }) => {
  const { pathname } = location;
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const PerformRedirect = () => {
    if (isAuthenticated()) {
      console.log("please redirect");
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
      return;
    }
    console.log(username);
    if (password.length < 5) {
      setErrorRegister(true);
      setText(true);
      return;
    }
    signup({ username, email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.email != email) {
          console.log("bubububub");
          setErrorRegister(true);
          setText(false);
          
        }else{
          setSuccessRegister(true);
        }
      })
      .catch((e) => console.log(e));

  };
  const [reload, setReload] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  useEffect(() => {}, [reload]);
  const errorMessageLogin = () => {
    {
      console.log("hi");
    }
    return (
      <div className="row">
        <div className="col-md text-left">
          <div
            className="alert alert-danger"
            style={{ display: errorLogin ? "" : "none" }}
          >
            Enter Valid Email and Password
          </div>
        </div>
      </div>
    );
  };
  const errorMessageRegister = () => {
    {
      console.log("hi");
    }
    return (
      <div className="row">
        <div className="col-md text-left">
          <div
            className="alert alert-danger"
            style={{ display: errorRegister ? "" : "none" }}
          >
            {!text
              ? "Enter Valid User Data"
              : "Password length should be greater than 5"}
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
        <title>Flone | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
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
                            <form>
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
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit" onClick={onLogin}>
                                  <span>Login</span>
                                </button>
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
                                placeholder="Password length should be greater than 5"
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
                              <div className="button-box">
                                <button type="submit" onClick={onRegister}>
                                  <span>Register</span>
                                </button>
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
