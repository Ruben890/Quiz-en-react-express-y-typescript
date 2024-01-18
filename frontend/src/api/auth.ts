import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { User } from "../interface/interfaces";


const apiURL =  import.meta.env.VITE_BACKEND_URL;
const authApi: AxiosInstance = axios.create({
  baseURL: `http://localhost:4000/auth`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `${Cookies.get('JWTtoken')}`
  }
});

export const authLogin = async (email: string, password: string) => {
  try {
    const response = await authApi.post('/login', { email, password });

    if (response.data.token) {
      const { token } = response.data;
      Cookies.set('JWTtoken', token);
    }
    return response.data
  } catch (error) {
    console.error("Error during login:");
    throw error
  }
};

export const authRegister = async (data: User) => {
  try {
    const response = await authApi.post('/register', data);
    return response.data
  } catch (error) {
    console.error("Error during registration:");
    throw error
  }
};

export const getMyUser = async () => {
  try {
    const response = await authApi.get('/me')
    return response.data
  } catch (error) {
    Cookies.remove("isLogin");
    throw error
  }
}
