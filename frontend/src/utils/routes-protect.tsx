import React from "react";
import { useAppSelector } from "../app/hooks";
import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo }) => {
  const isAuthenticated =
    useAppSelector((state) => state.auth.isLogin) ||
    Boolean(Cookies.get("isLogin"));
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
