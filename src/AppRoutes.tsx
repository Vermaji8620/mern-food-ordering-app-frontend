import { Navigate, Route, Routes } from "react-router-dom";
import Layouts from "./layouts/layouts";
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layouts>
            <HomePage />
          </Layouts>
        }
      />
      <Route path="/auth-callback" element={<AuthCallBackPage />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layouts>
              <UserProfilePage />
            </Layouts>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
