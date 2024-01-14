import { authRegister } from "../api/auth";
import { User } from "../interface/interfaces";
import { authLogin } from "../api/auth";

const useFetchRegister = () => {
  const fetchData = async (user: User) => {
    try {
      await authRegister(user);
      const { email, password } = user;
      await authLogin(email, password);

      return (window.location.href = "/");
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchData };
};

export default useFetchRegister;
