import { useState, useEffect } from "react";
import { getOneQuiz } from "../api/quiz";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { Quiz } from "../interface/interfaces";

const useFetchOneQuiz = (id: number) => {
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneQuiz(id);
        setQuiz(response);
        setMessage(""); 
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
  }, [id, dispatch]);

  
  return { quiz, message, loading,  };
};

export default useFetchOneQuiz;
