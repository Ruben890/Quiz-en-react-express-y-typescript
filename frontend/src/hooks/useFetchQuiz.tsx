import { useState, useEffect } from "react";
import { getAllQuiz } from "../api/quiz"; // Asegúrate de importar la función adecuada
import {Quiz as QuizType} from "../interface/interfaces";
const useFetchQuiz = () => {
  const [quiz, setQuiz] = useState<QuizType[]>([]);
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllQuiz();
        setQuiz(response);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setError("Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { quiz, isloading, error };
};

export default useFetchQuiz;
