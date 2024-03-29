import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { Option } from "../interface/interfaces";

const OptionsAPI: AxiosInstance = axios.create({
    baseURL: "http://localhost:4000/options/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${Cookies.get('JWTtoken')}`
    }
})


export const getOptionsByQuestionId = async (id:number | undefined): Promise<Option[]> => {
    try {
        const response = await OptionsAPI.get(`/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}