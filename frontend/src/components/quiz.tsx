import useFetchQuiz from "../hooks/useFetchQuiz";
import { Link } from "react-router-dom";

const Quiz = () => {
  const { quiz, isloading } = useFetchQuiz();

  if (isloading) {
    return
  }

  return (
    <>
      {quiz.length ? (
        quiz.map((quizItem) => (
          <div
            className="card w-96 bg-base-100 shadow-xl m-4 cursor-pointer"
            key={quizItem.id}>
            <div className="card-body">
              <h2 className="card-title">{quizItem.title}</h2>
              <p>{quizItem.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Start</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="h-screen w-screen flex items-center justify-center">
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