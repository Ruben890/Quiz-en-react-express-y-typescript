import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { Points } from "../interface/interfaces";

const PointsAPI: AxiosInstance = axios.create({
    baseURL: "http://localhost:4000/points/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${Cookies.get('JWTtoken')}`
    }
});

const assignPointAPI = async (data: Points) => {
    try {
        const response = await PointsAPI.post('assignPoint', data); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default assignPointAPI;
