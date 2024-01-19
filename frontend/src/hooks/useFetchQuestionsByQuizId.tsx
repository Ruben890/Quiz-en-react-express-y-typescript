import { useState, useEffect } from "react";
import { getQuestionsByQuizId } from "../api/questions";
import { Question } from "../interface/interfaces";
import { AxiosError } from "axios";

const useFetchQuestions = (id: number) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getQuestionsByQuizId(id);
                setQuestions(response);
                setLoading(false);
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    setMessage(error.response?.data || "fatal error");
                } else {
                    setMessage("Error fetching data");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { questions, loading, message };
};

export default useFetchQuestions;
