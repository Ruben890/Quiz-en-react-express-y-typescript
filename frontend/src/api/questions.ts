import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { Question } from "../interface/interfaces";

const QuestionsAPI: AxiosInstance = axios.create({
    baseURL: "http://localhost:4000/questions/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${Cookies.get('JWTtoken')}`
    }
})


export const getAllQuestions = async (): Promise<Question[]> => {
    try {
        const response = await QuestionsAPI.get('/');
        return response.data

    } catch (error) {
        console.log(error)
        throw error
    }

} 