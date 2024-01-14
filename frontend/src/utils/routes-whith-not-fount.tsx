import React,{ReactNode} from "react";
import { Route, Routes } from "react-router-dom";

interface CardProps {
    children: ReactNode;
}


const RouteWithNotFound: React.FC<CardProps> = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<div>Error 404: Not Found</div>} /> 
    </Routes>
  );
};

export default RouteWithNotFound;
