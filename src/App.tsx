import React from "react";
// import React Router Dom
import { Routes, Route } from "react-router-dom";

import { useTypedSelector } from "./hooks/useTypedSelector";

// Import components
import Login from "./pages/auth/login";
import NotFound from "./pages/notFound";
import ForgotPassword from "./pages/auth/forgotPassword";
import DashboardLayout from "./containers/dashboardLayout";
import DefaultPage from "./pages/defaultPage";
import Users from "./pages/users/index";
import RegisterPage from "./pages/register";
import Loader from "./components/loader";
import { ToastContainer } from "react-toastify";
import EditUser from "./pages/edituser";
import Profile from "./pages/auth/profile";
const App: React.FC = () => {
  // For protected routes
  const { isAuth, user, payload } = useTypedSelector(
    (store) => store.UserReducer
  );

  return (
    <>
      <Loader />
      <ToastContainer />
      <Routes>
        {isAuth && (
          <>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route index element={<DefaultPage />} />
              {user.role === "Administrators" && (
                <>
                  <Route path="edituser" element={<EditUser />} />
                  <Route path="users" element={<Users />} />
                  <Route path="register" element={<RegisterPage />} />
                </>
              )}
            </Route>
          </>
        )}

        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route path="/dashboard/*" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
