import React, { useState } from "react";
import TopSection from "../components/top-section";
import Navbar from "../components/Navbar";
import firebase from "../firebase.config";
import { useHistory } from "react-router-dom";
import { saveUser } from "../util/db";

const LoginPage = () => {
  const history = useHistory();
  const [number, setnumber] = useState("");
  const [code, setcode] = useState("");
  const [isCodeSent, setisCodeSent] = useState(false);
  const [name, setname] = useState("");
  const [buttonText, setbuttonText] = useState("Send OTP");
  const [vertifyBtnText, setvertifyBtnText] = useState("Verify");

  const handleSignup = (e) => {
    e.preventDefault();
    setbuttonText("Sending...");
    window.appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    const appVerifier = window.appVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(`+91${number}`, appVerifier)
      .then(function (confirmationResult) {
        setisCodeSent(true);
        console.log("success");
        window.confirmationResult = confirmationResult;
      })
      .catch(function (error) {
        setbuttonText("Send OTP");
        console.log("Error:" + error.code);
      });
  };

  const onVerifyCodeSubmit = async (event) => {
    event.preventDefault();
    setvertifyBtnText("Verifying...");
    const verificationId = `${code}`;
    window.confirmationResult
      .confirm(verificationId)
      .then(function (result) {
        localStorage.setItem("user", JSON.stringify({ name, number }));
        if (saveUser(result.user.uid, name, number)) {
          history.push("/Sip");
        }
      })
      .catch(function (error) {
        // User couldn't sign in (bad verification code?)
        setvertifyBtnText("Verify");
        console.error("Error while checking the verification code", error);
        window.alert(
          "Error while checking the verification code:\n\n" +
            error.code +
            "\n\n" +
            error.message
        );
      });
  };

  const form = () => {
    return (
      <div className="card rounded shadow-md p-4 text-center">
        <form onSubmit={handleSignup}>
          <h3>Login here</h3>
          <div class="form-group text-left">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter name"
              value={name}
              required={true}
              onChange={(e) => setname(e.target.value)}
            />
            <small id="emailHelp" class="form-text text-muted"></small>
          </div>
          <div class="form-group text-left">
            <label for="exampleInputPassword1">Mobile Number</label>
            <input
              type="tel"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Mobile Number"
              maxLength="10"
              required={true}
              value={number}
              onChange={(e) => setnumber(e.target.value)}
            />
          </div>

          <button type="submit" class="btn btn-primary btn-sm">
            {buttonText}
          </button>
        </form>
      </div>
    );
  };

  const verifyOTPForm = () => {
    return (
      <div className="card rounded shadow-md p-4 text-center">
        <form onSubmit={onVerifyCodeSubmit}>
          <h3>Enter otp here</h3>
          <div class="form-group text-left">
            <label for="exampleInputEmail1">OTP</label>
            <input
              type="tel"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter name"
              value={code}
              maxLength="6"
              required={true}
              onChange={(e) => setcode(e.target.value)}
            />
            <small id="emailHelp" class="form-text text-muted"></small>
          </div>
          <button type="submit" class="btn btn-primary btn-sm">
            {vertifyBtnText}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <TopSection />
      <Navbar />
      <hr />
      <div className="container text-center">
        <div id="recaptcha-container"></div>
        {isCodeSent ? (
          <div className="col-md-4 offset-md-4 text-left">
            {verifyOTPForm()}
          </div>
        ) : (
          <div className="col-md-6 offset-md-3 text-left">{form()}</div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
