import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Login = () => {
  const history = useNavigate();
  useEffect(() => {
    const token = Cookies.get("_jwtToken");
    token && history("/esign/documents/all");
  }, [history]);

  const [{ email, password }, setInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const onChangeInput = (fieldName) => (event) => {
    setInfo((pre) => ({ ...pre, [fieldName]: event.target.value }));
  };

  const submitData = async () => {
    const userDetails = {
      email,
      password,
    };
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const res = await fetch("http://localhost:5000/login", options);
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      Cookies.set("_jwtToken", data._token, { expires: 1 });
      history("/esign/documents/all");
      localStorage.setItem("_user", JSON.stringify(data.user));
    } else {
      setError(data.msg);
    }
  };

  return (
    <div className="container-fluid justify-content-center p-5 bg-success p-2 text-dark bg-opacity-10 w-100%">
      <div className="text-center">
        <img
          src="https://esignfor.us/assets/images/logo.png"
          alt="logo"
          className="w-25 mb-3"
        />
      </div>
      <div className="card w-50 p-5 m-auto">
        <div className="mt-4">
          <label htmlFor="other" className="mb-2">
            Email
          </label>
          <input
            id="other"
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={onChangeInput("email")}
          />
        </div>
        <div className="mt-3 mb-4">
          <label htmlFor="pass" className="mb-2">
            Password
          </label>
          <input
            id="pass"
            type="password"
            value={password}
            className="form-control"
            placeholder="Password"
            onChange={onChangeInput("password")}
          />
        </div>
        <button className="btn btn-primary w-25 mt-2" onClick={submitData}>
          SignIn
        </button>
        {error !== "" && <p className="text-danger mt-3">**{error}</p>}

        <p className="mt-3">
          Dont't have account? &ensp;<Link to="/auth/signup">Create One!</Link>
        </p>
        <div className="d-flex justify-content-between p-3">
          <hr className="w-25" />
          <p className="m-auto">Or sign in with</p>
          <hr className="w-25" />
        </div>
        <div className="d-flex justify-content-around">
          <img
            src="https://esignfor.us/assets/images/raterspot-logo.png"
            alt="logo"
            className="w-25"
          />
          <img
            src="https://esignfor.us/assets/images/policyspot-logo.png"
            alt="logo"
            className="w-25"
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
