import { createQuiz } from "../api/quiz";
import { Quiz } from "../interface/interfaces";
const useFetchCreateQuiz = () => {
  const fetchData = async (quizData: Quiz | null) => {
    try {
      await createQuiz(quizData);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return { fetchData };
};

export default useFetchCreateQuiz;
