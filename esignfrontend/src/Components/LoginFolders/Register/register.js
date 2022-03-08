import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Register = () => {
  const his = useNavigate();
  useEffect(() => {
    const token = Cookies.get("_jwtToken");
    token && his("/esign/documents/all");
  }, [his]);

  const [{ name, password, email, confirmPassword, phone }, setInfo] = useState(
    {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
    }
  );

  const [
    {
      nameError,
      passwordError,
      emailError,
      confirmPasswordError,
      phoneError,
      genderError,
    },
    setError,
  ] = useState({
    nameError: "",
    passwordError: "",
    confirmPasswordError: "",
    emailError: "",
    phoneError: "",
    genderError: false,
  });

  const [gender, setGender] = useState("");
  const [mailError, setMailError] = useState(false);
  const [passError, setPasswordError] = useState(false);
  const [registerMsg, setMsg] = useState("");

  const history = useNavigate();

  const notify = () => toast(`Successfully Registered`);

  const onChangeRadio = (e) => {
    setError((pre) => ({ ...pre, genderError: false }));
    setGender(e.target.value);
  };

  const changeInput = (fieldName) => (event) => {
    setError((pre) => ({ ...pre, genderError: false }));
    setPasswordError(false);
    setInfo((preState) => ({ ...preState, [fieldName]: event.target.value }));
  };

  const onChangeBlur = (fieldName) => (event) => {
    if (event.target.value === "") {
      setError((preState) => ({
        ...preState,
        [fieldName]: "error",
      }));
    } else {
      console.log(event.target.value);
      setError((preState) => ({
        ...preState,
        [fieldName]: event.target.value,
      }));
    }
  };

  const submitData = async () => {
    // console.log(genderError);
    if (gender === "") {
      setError((pre) => ({ ...pre, genderError: true }));
    } else if (
      nameError === "" ||
      emailError === "" ||
      confirmPasswordError === "" ||
      phoneError === "" ||
      passwordError === ""
    ) {
      setError((pre) => ({ ...pre, genderError: true }));
    } else if (!email.includes("@gmail.com") || email.length < 15) {
      setMailError(true);
    } else if (password !== confirmPassword) {
      setPasswordError(true);
    } else if (name.length < 5 || phone.length !== 10) {
      setError((pre) => ({ ...pre, genderError: true }));
    } else {
      setMailError(false);
      setError((pre) => ({ ...pre, genderError: false }));
      const temObj = {
        name,
        password,
        email,
        phone,
        gender,
        profilePicture: "",
        status: "OK",
      };
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(temObj),
      };
      const res = await fetch("http://localhost:5000/register", options);
      const data = await res.json();

      if (data.status === "OK") {
        notify();
        history("/auth/signin");
      } else {
        setMsg(data.msg);
      }
    }
  };

  return (
    <div className="container-fluid bg-success label-2 text-dark bg-opacity-10 label-5 p-5">
      <div className="text-center">
        <div>
          <img src="https://esignfor.us/assets/images/logo.png" alt="logo" />
        </div>
      </div>
      <div className="text-center d-flex justify-content-center">
        <div className="card text-center w-50 d-flex justify-content-between">
          <div className="card-body d-flex justify-content-between">
            <label className="card-title">Name</label>
            <input
              type="text"
              value={name}
              className={`form-control w-75 ${
                nameError === "error" &&
                "border-danger border-2 shadow-lg  bg-body rounded"
              }`}
              placeholder="Name"
              onChange={changeInput("name")}
              onBlur={onChangeBlur("nameError")}
            />
          </div>
          <div className="card-body d-flex justify-content-between">
            <label className="card-title">Email</label>
            <input
              type="text"
              className={`form-control w-75 ${
                emailError === "error" &&
                "border-danger border-2 shadow-lg  bg-body rounded"
              }`}
              placeholder="Email"
              value={email}
              onChange={changeInput("email")}
              onBlur={onChangeBlur("emailError")}
            />
          </div>
          <div className="card-body d-flex justify-content-between">
            <label className="card-title">Password</label>
            <input
              type="text"
              className={`form-control w-75 ${
                passwordError === "error" &&
                "border-danger border-2 shadow-lg  bg-body rounded"
              }`}
              placeholder="PassWord"
              value={password}
              onChange={changeInput("password")}
              onBlur={onChangeBlur("passwordError")}
            />
          </div>
          <div className="card-body d-flex justify-content-between">
            <label className="card-title">Confirm Password</label>
            <input
              type="text"
              className={`form-control w-75 ${
                confirmPasswordError === "error" &&
                "border-danger border-2 shadow-lg  bg-body rounded"
              }`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={changeInput("confirmPassword")}
              onBlur={onChangeBlur("confirmPasswordError")}
            />
          </div>
          <div className="card-body d-flex justify-content-between">
            <label className="card-title">Phone</label>
            <input
              type="text"
              value={phone}
              className={`form-control w-75 ${
                phoneError === "error" &&
                "border-danger border-2 shadow-lg  bg-body rounded"
              }`}
              placeholder="Phone Number"
              onChange={changeInput("phone")}
              onBlur={onChangeBlur("phoneError")}
            />
          </div>
          <div className="card-body d-flex justify-content-between">
            <label className="card-title">Gender :</label>
            <div>
              <input
                id="male"
                type="radio"
                value="Male"
                name="gender"
                onClick={onChangeRadio}
              />
              <label htmlFor="male" className="ms-2">
                Male
              </label>
            </div>
            <div>
              <input
                id="female"
                type="radio"
                value="Female"
                name="gender"
                onClick={onChangeRadio}
              />
              <label htmlFor="female" className="ms-2">
                Female
              </label>
            </div>
            <div>
              <input
                id="other"
                type="radio"
                value="Other"
                name="gender"
                onClick={onChangeRadio}
              />
              <label htmlFor="other" className="ms-2">
                Other
              </label>
            </div>
          </div>
          <div>
            <button className="btn btn-primary" onClick={submitData}>
              Register
            </button>
          </div>
          {(nameError === "error" ||
            emailError === "error" ||
            confirmPasswordError === "error" ||
            phoneError === "error" ||
            passwordError === "error" ||
            genderError === true) === true && (
            <p className="shadow-lg  bg-body rounded text-danger mt-3">
              *** ALl Fields Are Required ***
            </p>
          )}
          {mailError && (
            <p className="shadow-lg  bg-body rounded text-danger mt-3">
              ** Please Provide Valid Gmail ID **
            </p>
          )}
          {passError && (
            <p className="shadow-lg  bg-body rounded text-danger mt-3">
              ** Password Should Be Match
            </p>
          )}
          {registerMsg && (
            <p className="shadow-lg  bg-body rounded text-danger mt-3">
              **{registerMsg}
            </p>
          )}
          <h6 className="mt-5">
            Already have an account ? &ensp;
            <Link to="/auth/signin"> SignIn</Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Register;
