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
        if (response.phone == null) response.phone = "";

        setValues({
          name: response.name,
          email: response.email,
          phone: response.phone,
        });
        // console.log("USERDATA", response);
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
            {/* <h5>Your Personal Details</h5> */}
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
          <div className="row">
            <div className="col-lg-12">
              <div className="cart-shiping-update-wrapper">
                <div className="cart-clear">
                  <button type="submit" onClick={onEdit}>
                    Edit
                  </button>
                </div>
                <div className="cart-clear">
                  <button type="submit" onClick={saveUserData}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="myaccount-info-wrapper">
          <div className="account-info-wrapper">
            <h4>My Account Information</h4>
            {/* <h5>Your Personal Details</h5> */}
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
          {/* <div className="row">
            <div className="col-2">
              <div className="billing-back-btn">
                <div className="billing-btn">
                  <button type="submit" onClick={onEdit}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
            <div className="col-10">
              <div className="billing-back-btn">
                <div className="billing-btn">
                  <button type="submit" onClick={saveUserData}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="cart-shiping-update-wrapper">
                <div className="cart-clear">
                  <button type="submit" onClick={onEdit}>
                    Edit
                  </button>
                </div>
                <div className="cart-clear">
                  <button type="submit" onClick={saveUserData}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Darzi Warzi|My Account</title>
        <meta name="description" content="Compare page of Darzi Warzi." />
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
                            Edit your account information{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>{Account()}</Card.Body>
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
