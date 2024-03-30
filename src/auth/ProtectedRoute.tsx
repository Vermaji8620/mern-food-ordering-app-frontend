import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth0();

  //   However, if you use the replace prop when navigating, the current history entry is replaced with the new one. This means that if you click the back button, you'll skip over the replaced route and go to the route before it.
  // In your ProtectedRoute component, if a user is not authenticated, they are redirected to the "/" route, and the current route is replaced in the history stack. This means that if the user clicks the back button after being redirected, they won't go back to the protected route.

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
