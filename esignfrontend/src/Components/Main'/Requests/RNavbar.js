import React, { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";
import { MdStars } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
const pageState = {
  RecipientsInfo: "RecipientsInfo",
  prepareFields: "prepareFields",
  terms: "terms",
  requesterSigns: "requesterSigns",
  finish: "finish",
};
const Navbar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const iconColor = state.pageStatus;

  return (
    <div className="d-flex justify-content-around h5-1 border-bottom rounded shadow-lg  bg-body">
      <img
        src="https://esignfor.us/assets/images/logo.png"
        alt="logo"
        style={{ width: "250px", height: "10vh" }}
      />
      <div className="text-center d-flex justify-content-between w-50">
        <div
          type="button"
          className="text-center d-flex justify-content-between"
          onClick={() =>
            dispatch({ type: "status", value: pageState.RecipientsInfo })
          }
        >
          <BsFillPeopleFill
            className="m-2 mt-1"
            style={{
              width: "50px",
              height: "10vh",
              color: iconColor === pageState.RecipientsInfo ? "green" : "grey",
            }}
          />
          <h5
            className="m-3"
            style={{
              color: iconColor === pageState.RecipientsInfo ? "green" : "grey",
            }}
          >
            Recipients Info
          </h5>
        </div>
        <div
          type="button"
          className="text-center d-flex justify-content-around"
          onClick={() =>
            dispatch({ type: "status", value: pageState.prepareFields })
          }
        >
          <IoIosSave
            className="m-2 mt-1"
            style={{
              width: "50px",
              height: "10vh",
              color: iconColor === pageState.prepareFields ? "green" : "grey",
            }}
          />
          <h5
            style={{
              color: iconColor === pageState.prepareFields ? "green" : "grey",
            }}
            className="m-3"
          >
            Prepare Fields
          </h5>
        </div>
        <div
          type="button"
          className="text-center d-flex justify-content-between"
          onClick={() => dispatch({ type: "status", value: pageState.terms })}
        >
          <MdStars
            className="m-2 mt-1"
            style={{
              width: "50px",
              height: "10vh",
              color: iconColor === pageState.terms ? "green" : "grey",
            }}
          />
          <h5
            style={{
              color: iconColor === pageState.terms ? "green" : "grey",
            }}
            className="m-3"
          >
            Terms & Conditions
          </h5>
        </div>
        <div
          type="button"
          className="text-center d-flex justify-content-between"
          onClick={() =>
            dispatch({ type: "status", value: pageState.requesterSigns })
          }
        >
          <FiEdit
            className="m-2 mt-1"
            style={{
              width: "50px",
              height: "10vh",
              color: iconColor === pageState.requesterSigns ? "green" : "grey",
            }}
          />
          <h5
            style={{
              color: iconColor === pageState.requesterSigns ? "green" : "grey",
            }}
            className="m-3"
          >
            Requester Signs
          </h5>
        </div>
        <div
          type="button"
          className="text-center d-flex justify-content-between"
          onClick={() => dispatch({ type: "status", value: pageState.finish })}
        >
          <TiTick
            className="m-2 mt-1"
            style={{
              width: "50px",
              height: "10vh",
              color: iconColor === pageState.finish ? "green" : "grey",
            }}
          />
          <h5
            style={{
              color: iconColor === pageState.finish ? "green" : "grey",
            }}
            className="m-3"
          >
            Notify & Finish
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
