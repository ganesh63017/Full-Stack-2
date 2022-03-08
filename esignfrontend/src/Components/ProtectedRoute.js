import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = Cookies.get("_jwtToken");
  return token ? (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/auth/signin" />
  );
};

export default ProtectedRoutes;
// import { Navigate } from "react-router-dom"; // Redirect is replaced with Navigate
// import Cookies from "js-cookie";

// const ProtectedRoutes = ({ children }) => {
//   // Use {children} to access the nested route
//   const token = Cookies.get("_jwtToken");
//   if (!token) {
//     return <Navigate to="/auth/signin" />;
//   }
//   return children;
// };

// export default ProtectedRoutes;
