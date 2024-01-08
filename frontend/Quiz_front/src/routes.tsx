import { BrowserRouter, Route } from "react-router-dom";
import RouteWithNotFound from "./utils/routes-whith-not-fount";
import ProtectedRoute from "./utils/routes-protect";
import AuthProtectRoute from "./utils/auth-protect-rutes";
import App from "./App";
import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from "./pages/dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <RouteWithNotFound>
        <Route path="/" element={<App />} />

        <Route element={<AuthProtectRoute redirectTo="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route element={<Dashboard />} path="/dashboard" />
        </Route>
      </RouteWithNotFound>
    </BrowserRouter>
  );
};

export default Routes;
