import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LocationMap from "../../components/contact/LocationMap";
import { sendMail } from "../../helpers/sendMail";

const Contact = ({ location }) => {
  const { pathname } = location;
  const [sent, setsent] = useState(false);
  const send = (e) => {
    e.preventDefault();
    if(!name||!email||!subject||!msg){
      seterror(true);
      return;
    }
    sendMail(values)
      .then((res) => {
        console.log(res);
        setsent(true);
      })
      .catch((e) => console.log(e));
  };
  // const [subject, setsubject] = useState('');
  // const [name, setname] = useState('');
  // const [email, setemail] = useState('');
  // const [msg, setmsg] = useState('');
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md text-left">
          <div
            className="alert alert-success"
            style={{ display: sent ? "" : "none" }}
          >
            Message Sent
          </div>
        </div>
      </div>
    );
  };
  const [values, setValues] = useState({
    name: "",
    email: "",
    msg: "",
    subject: "",
  });
  const [error, seterror] = useState(false);
  let { name, email, msg, subject } = values;
  const handleChange = (key) => (event) => {
    setValues({ ...values, [key]: event.target.value });
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            All Fields are mandatory
          </div>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Contact</title>
        <meta
          name="description"
          content="Contact of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Contact
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        {/* 28.647945382571258, 77.33842335845067 */}
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="custom-row-2">
              
              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <form className="contact-form-style">
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          name="name"
                          placeholder="Name*"
                          type="text"
                          value={name}
                          onChange={handleChange("name")}
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          placeholder="Email*"
                          type="email"
                          value={email}
                          onChange={handleChange("email")}
                        />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder="Subject*"
                          type="text"
                          value={subject}
                          onChange={handleChange("subject")}
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Your Message*"
                          value={msg}
                          onChange={handleChange("msg")}
                        />
                        {successMessage()}
                        {errorMessage()}
                        {!sent ? (
                          <button
                            onClick={send}
                            className="submit"
                            type="submit"
                          >
                            SEND
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </form>
                  <p className="form-messege" />
                </div>
              </div>


              <div className="col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+012 345 678 102</p>
                      <p>+012 345 678 102</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:urname@email.com">urname@email.com</a>
                      </p>
                      <p>
                        <a href="//urwebsitenaem.com">urwebsitenaem.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Address goes here, </p>
                      <p>street, Crossroad 123.</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-map mb-10 mt-25">
              <LocationMap
                latitude="28.658019914748266"
                longitude="77.29002574193976"
              />
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object,
};

export default Contact;
