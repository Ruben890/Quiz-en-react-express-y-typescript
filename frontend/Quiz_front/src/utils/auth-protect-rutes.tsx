import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAppSelector } from "../app/hooks";
import Cookies from "js-cookie";

interface Props {
  redirectTo: string;
}

const AuthProtectRoute: React.FC<Props> = ({ redirectTo }) => {
  const isAuthenticated =
    useAppSelector((state) => state.auth.isLogin) ||
    Boolean(Cookies.get("isLogin"));

  return isAuthenticated ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default AuthProtectRoute;
