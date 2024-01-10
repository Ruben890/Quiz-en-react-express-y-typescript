import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { Quiz } from "../interface/interfaces";


const quizApi: AxiosInstance = axios.create({
    baseURL: "http://localhost:4000/quiz/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${Cookies.get('JWTtoken')}`
    }
});

export const getAllQuiz = async (): Promise<Quiz[]> => {
    try {
        const response = await quizApi.get('/');
        return response.data; // Retorna los datos obtenidos
    } catch (error) {
        console.error("Error fetching quiz:", error);
        throw error; // Relanza el error para que el código que llama pueda manejarlo
    }
};



export const createQuiz = async (data: Quiz | null) => {
    try {
        const response = await quizApi.post('/createQuiz', data)
        return response.data
    } catch (error) {
        console.error('error al crear el nueva prueba', error)
        throw error
    }

}

export const getOneQuiz = async (id: number) => {
    try {
        const response = await quizApi.get(`/${id}`)
        return response.data

    } catch (error) {
        console.error(error)
        throw error
    }

}