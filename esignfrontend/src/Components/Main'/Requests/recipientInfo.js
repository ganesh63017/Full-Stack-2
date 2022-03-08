import { useState } from "react";
import { MdDelete } from "react-icons/md";
import "./request.css";
import { v4 } from "uuid";
import PrepareFields from "./prepareFields";
import Terms from "./terms";
import RequesterSigns from "./requesterSigns";
import Finish from "./finish";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./RNavbar";
import { useParams } from "react-router-dom";

const pageState = {
  RecipientsInfo: "RecipientsInfo",
  prepareFields: "prepareFields",
  terms: "terms",
  requesterSigns: "requesterSigns",
  finish: "finish",
};

const Request = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();
  console.log(id);

  const [inputList, setList] = useState([
    {
      id: v4(),
      value: "",
    },
  ]);

  const [ME, setMe] = useState(true);

  const addList = () => {
    setList((pre) => [...pre, { id: v4(), value: "" }]);
  };

  const deleteItem = (id) => {
    const deletedData = inputList.filter((each) => each.id !== id);
    const user = JSON.parse(localStorage.getItem("_user"));
    const a = deletedData.filter((each) => each.value === user.email);
    a.length === 0 ? setMe(true) : setMe(false);
    setList(deletedData);
  };

  const changeEmail = (event, id) => {
    const updatedData = inputList.map((each) => {
      if (each.id === id) {
        return { ...each, value: event.target.value };
      } else {
        return each;
      }
    });
    setList(updatedData);
  };

  const clickMe = () => {
    const user = JSON.parse(localStorage.getItem("_user"));
    const updated = inputList.filter((each) => each.value === "")[0];
    const a = inputList.map((each) => {
      if (each.id === updated.id) {
        return { ...each, value: user.email };
      }
      return each;
    });
    setList(a);
    setMe(false);
  };

  const goToPrepare = () => {
    const url = "http://localhost:5000/filesuat.esignfor.us/eSignForUs/sign";
    const details = {
      fileId: "",
    };
    const options = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(details),
    };
    dispatch({ type: "status", value: pageState.prepareFields });
  };

  const allFilled = inputList.some(
    (each) => !each.value.endsWith("@gmail.com")
  );

  const renderRecipientsInfo = () => {
    return (
      <>
        <Navbar />
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
          <div className="m-5 w-50">
            <div>
              <input type="checkbox" className="m-2" id="check" />
              <label className="m-2" htmlFor="check">
                Maintain signers sequence
              </label>
            </div>
            {inputList &&
              inputList.map((each) => (
                <div
                  style={{
                    border: "1px solid grey",
                    padding: "10px",
                    marginTop: "2vh",
                    width: "600px",
                  }}
                  className="d-flex justify-content-between"
                  key={each.id}
                >
                  <input
                    type="text"
                    placeholder="Type In Email"
                    value={each.value}
                    style={{ border: "none", outline: "none" }}
                    onChange={(event) => changeEmail(event, each.id)}
                  />
                  {inputList.length > 1 && (
                    <MdDelete
                      style={{ color: "red", fontSize: "25px" }}
                      onClick={() => deleteItem(each.id)}
                    />
                  )}
                </div>
              ))}
            <div className="mt-4 d-flex justify-content-between w-75">
              <button className="btn btn-outline-info" onClick={addList}>
                Signer +
              </button>
              {ME ? (
                <button className="btn btn-outline-info" onClick={clickMe}>
                  Me +
                </button>
              ) : null}
              {!allFilled && (
                <button
                  className="btn btn-outline-success"
                  onClick={goToPrepare}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  switch (state.pageStatus) {
    case pageState.RecipientsInfo:
      return renderRecipientsInfo();
    case pageState.prepareFields:
      return <PrepareFields />;
    case pageState.terms:
      return <Terms />;
    case pageState.requesterSigns:
      return <RequesterSigns />;
    case pageState.finish:
      return <Finish />;
    default:
      return <p>sfs</p>;
  }
};

export default Request;
