import { QuizData } from "../interface/QuizData";
import { createQuiz } from "../api/quiz";

const useFetchCreateQuiz = () => {
  const fetchData = async (quizData: QuizData) => {
    try {
      await createQuiz(quizData);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return { fetchData };
};

export default useFetchCreateQuiz;
