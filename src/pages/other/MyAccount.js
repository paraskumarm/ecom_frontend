import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import {
  getUserDatahelper,
  userDatahelper,
} from "../../helpers/userDatahelper";
import { isAuthenticated } from "../../helpers/auth";

const MyAccount = ({ location }) => {
  const { pathname } = location;
  const userId = isAuthenticated() && isAuthenticated().user.id;

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  let { name, email, phone } = values;
  const handleChange = (key) => (event) => {
    setValues({ ...values, [key]: event.target.value });
  };
  const saveUserData = (event) => {
    event.preventDefault();
    setedit(false);
    userDatahelper(userId, values)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  };

  const getUserData = () => {
    
    getUserDatahelper(userId)
      .then((response) => {
        setValues({
          name: response.name,
          email: response.email,
          phone: response.phone,
        });
        console.log("USERDATA", response);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getUserData();
  }, []);
  const [edit, setedit] = useState(false);
  const onEdit = () => {
    setedit(true);
  };
  const Account = () => {
    if (edit) {
      return (
        <div className="myaccount-info-wrapper">
          <div className="account-info-wrapper">
            <h4>My Account Information</h4>
            <h5>Your Personal Details</h5>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="billing-info">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={handleChange("name")}
                />
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="billing-info">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleChange("email")}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="billing-info">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={handleChange("phone")}
                />
              </div>
            </div>
          </div>
          <div className="billing-back-btn">
            <div className="billing-btn">
              <button type="submit" onClick={onEdit}>
                Edit
              </button>
            </div>
          </div>

          <div className="billing-back-btn">
            <div className="billing-btn">
              <button type="submit" onClick={saveUserData}>
                Save
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="myaccount-info-wrapper">
          <div className="account-info-wrapper">
            <h4>My Account Information</h4>
            <h5>Your Personal Details</h5>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="billing-info">
                <label>Name</label>
                <input type="text" value={name} disabled />
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="billing-info">
                <label>Email</label>
                <input type="email" value={email} disabled />
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="billing-info">
                <label>Phone Number</label>
                <input type="text" value={phone} disabled />
              </div>
            </div>
          </div>
          <div className="billing-back-btn">
            <div className="billing-btn">
              <button type="submit" onClick={onEdit}>
                Edit
              </button>
            </div>
          </div>

          <div className="billing-back-btn">
            <div className="billing-btn">
              <button type="submit" onClick={saveUserData}>
                Save
              </button>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Edit your account information{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          {Account()}
                          <p className="text-center">
                            {JSON.stringify(values)}
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Change your password
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Change Password</h4>
                              <h5>Your Password</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password</label>
                                  <input type="password" />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password Confirm</label>
                                  <input type="password" />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Modify your address book entries{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Address Book Entries</h4>
                            </div>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                    <p>John Doe</p>
                                    <p>Paul Park </p>
                                    <p>Lorem ipsum dolor set amet</p>
                                    <p>NYC</p>
                                    <p>New York</p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-edit-delete text-center">
                                    <button className="edit">Edit</button>
                                    <button>Delete</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
