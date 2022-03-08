import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/LoginFolders/LoginPage/Login";
import Register from "./Components/LoginFolders/Register/register";
import Home from "./Components/Main'/Home/home";
import Request from "./Components/Main'/Requests/recipientInfo";
import ProtectedRoutes from "./Components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/esign/documents/all" />}
        ></Route>
        <Route exact path="/auth/signup" element={<Register />}></Route>

        <Route exact path="/auth/signin" element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/esign/documents/all" element={<Home />}></Route>
          <Route exact path="/esign/request/:id" element={<Request />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
