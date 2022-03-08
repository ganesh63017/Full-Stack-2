import React, { useState } from "react";
import { AiTwotoneFolderOpen, AiTwotoneDelete } from "react-icons/ai";
import { IoIosCloudUpload } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import "./home.css";
// import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
// import { Worker } from "@react-pdf-viewer/core"; // install this library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  // Create new plugin instance
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [title, setTitle] = useState("");
  const [pdfFileError, setPdfFileError] = useState(true);
  const [personId, setId] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [fileId, setFileId] = useState("");

  // for submit event
  // const [viewPdf, setViewPdf] = useState(null);

  // onchange event
  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
          setPdfFile(e.target.result);
          setPdfFileError(false);
          const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
          };
          const url = "http://localhost:5000/esign/documents/all";
          const res = await fetch(url, options);
          const data = await res.json();
          const ul = "http://localhost:5000/esign/request/id";
          const idRes = await fetch(ul, options);
          const data1 = await idRes.json();
          if (res.status === 200) {
            setId(data1._id);
            setFileId(data._id);
          }
        };
      } else {
        setPdfFileError(true);
        notify();
      }
    } else {
      console.log("select your file");
    }
  };

  const notify = () => toast(`Please Select valid File`);
  const notifyError = () => toast(`Please Enter Title of Document`);

  const getTitle = (event) => {
    setPdfFileError(false);
    setTitle(event.target.value);
  };

  const goToNext = async () => {
    if (title === "") {
      notifyError();
      setPdfFileError(true);
    } else {
      setPdfFileError(false);
      const url = "http://localhost:5000/eSignForUs/sign";
      const user = JSON.parse(localStorage.getItem("_user"));
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          userId: user._id,
          fileId: fileId,
          title: title,
          signers: [],
          unsignedDocument: pdfFile,
        }),
      };
      await fetch(url, options);
    }
  };

  // form submit
  // const handlePdfFileSubmit = (e) => {
  //   e.preventDefault();
  //   if (pdfFile !== null) {
  //     setViewPdf(pdfFile);
  //   } else {
  //     setViewPdf(null);
  //   }
  // };
  // console.log(pdfFile);

  return (
    <>
      <Navbar />
      <div className="w-25 mt-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex p-2 button" style={{ cursor: "pointer" }}>
            <AiTwotoneFolderOpen style={{ width: "100px", height: "5vh" }} />
            <h5 className="mt-2">Documents</h5>
          </div>
        </div>
        <div
          className="d-flex justify-content-between w-25 div-2 text-center"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <div className="d-flex p-2 button" style={{ cursor: "pointer" }}>
            {" "}
            <IoIosCloudUpload style={{ width: "100px", height: "5vh" }} />
            <h5 className="mt-2">Uploads</h5>
          </div>
        </div>
        <div className="d-flex justify-content-between w-25 div-2 text-center">
          <div className="d-flex p-2 button" style={{ cursor: "pointer" }}>
            {" "}
            <BiEdit style={{ width: "100px", height: "5vh" }} />
            <h5 className="mt-2">Requests</h5>
          </div>
        </div>
        <div className="d-flex justify-content-between w-25 div-2 text-center">
          <div className="d-flex p-2 button" style={{ cursor: "pointer" }}>
            <AiTwotoneDelete style={{ width: "100px", height: "5vh" }} />
            <h5 className="mt-2">Archived</h5>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ width: "900px" }}>
            <div className="modal-header ">
              <h5 className="modal-title" id="exampleModalLabel">
                Initiate eSign Request
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-between w-50 mb-5">
                <p className="m-2">Document:</p>
                <div className="d-flex">
                  <input
                    className="m-2 btn text-success"
                    type="file"
                    onChange={handlePdfFileChange}
                  />
                </div>
              </div>{" "}
              <div className="d-flex justify-content-between w-75 mt-5">
                <p style={{ marginRight: "5vh" }}>Title:</p>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={getTitle}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <Link to={`/esign/request/${personId}`}>
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#59d4af" }}
                  disabled={pdfFileError || title === ""}
                  onClick={goToNext}
                  data-bs-dismiss="modal"
                >
                  Next
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* {viewPdf && (
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <Viewer
                fileUrl={viewPdf}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </>
        )} */}
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
    </>
  );
};

export default Home;

//   return (
//     <div className="container">
//       <br></br>

//       <form className="form-group" >
//         <input
//           type="file"
//           className="form-control"

//         />
//         {pdfFileError && <div className="error-msg">{pdfFileError}</div>}
//         <br></br>
//         <button type="submit" className="btn btn-success btn-lg">
//           UPLOAD
//         </button>
//       </form>
//       <br></br>
//       <h4>View PDF</h4>
//       <div className="pdf-container">
//         {/* show pdf conditionally (if we have one)  */}

//         {/* if we dont have pdf or viewPdf state is null */}
//         {!viewPdf && <>No pdf file selected</>}
//       </div>
//     </div>
//   );
// };
