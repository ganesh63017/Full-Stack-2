import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("_user"));
    setName(userData.name);
  }, []);

  const history = useNavigate();

  const logout = () => {
    Cookies.remove("_jwtToken");
    localStorage.clear();
    history("/");
  };
  return (
    <div className="d-flex justify-content-between p-1 border-bottom rounded shadow-lg  bg-body">
      <img
        src="https://esignfor.us/assets/images/logo.png"
        alt="logo"
        style={{ width: "200px", height: "8vh" }}
      />
      <div className="text-center d-flex justify-content-between ">
        <GoPerson
          style={{ width: "100px", height: "5vh", "marginRight": "0" }}
          className="m-auto"
        />
        <div style={{ "marginLeft": "0" }}>
          <p className="m-2">{name}</p>
          <button className="btn btn-link" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
