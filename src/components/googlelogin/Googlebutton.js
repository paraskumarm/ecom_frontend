import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Redirect } from "react-router-dom";
import { authenticate, googlesignin, isAuthenticated, signout } from "../../helpers/auth";
const clientId =
  "883002545484-41jvs2lv73bcqsvqpa0a2ldi9j7lg3qf.apps.googleusercontent.com";

function Googlebutton() {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const PerformRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  const onLoginSuccess = (res) => {
    console.log("Login Success:", res);
    let token = res.tokenObj.access_token;
    console.log(token);
    // let email = res.Du.tv;
    // let name = res.Du.tf;
    let email = res.profileObj.email;
    let name = res.profileObj.name;
    console.log(name);
    console.log(email);
    googlesignin({ name,email, token })
      .then((data) => {
        console.log(data);
        setShowloginButton(false);
        setShowlogoutButton(true);
        if (data.token) {
          authenticate(data, () => {
            console.log("token added");
            window.location.reload();
          });
        //   window.location.reload();
        }
      })
      .catch((e) => console.log(e));
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    signout(() => {})
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };
  return (
    <div>
      {showloginButton ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign In"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={false}
        />
      ) : null}

      {showlogoutButton ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Sign Out"
          onLogoutSuccess={onSignoutSuccess}
        ></GoogleLogout>
      ) : null}
      {PerformRedirect()}
    </div>
  );
}

export default Googlebutton;
