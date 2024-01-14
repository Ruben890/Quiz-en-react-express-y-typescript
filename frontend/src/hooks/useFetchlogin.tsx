import { useState } from "react";
import { authLogin } from "../api/auth";
import { AxiosError } from "axios";

const useFetchLogin = () => {
  const [message, setMessage] = useState("");

  const fetchData = async (email: string, password: string) => {
    // Email validation check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    try {
      await authLogin(email, password);
      window.location.href = "/";
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data.error || "An error occurred");
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  return { message, fetchData };
};

export default useFetchLogin;
