import useFetchQuiz from "../hooks/useFetchQuiz";

import { Link } from "react-router-dom";
const Quiz = () => {
  const { quiz } = useFetchQuiz();



  return (
    <>
      {quiz.length ? (
        quiz.map((quizItem) => (
          <div
            key={quizItem.id}
            className="container mx-auto p-3 shadow-lg rounded-lg m-3"
          >
            <h2 className="text-2xl">{quizItem.title}</h2>
          </div>
        ))
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div>
            <p className="text-6xl">No hay datos</p>
            <button
              className="mt-10 relative p-2 bg-purple-800 text-white text-xl rounded-lg shadow-xl hover:bg-purple-900 duration-300 transition-all"
              style={{ left: "4rem" }}
            >
              <Link to="/dashboard" className="m-2">
                Crear una nueva prueba
              </Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
