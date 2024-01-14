import useFetchQuiz from "../hooks/useFetchQuiz";
import { Link } from "react-router-dom";
import { Modal } from "./modal";
const Quiz = () => {
  const { quiz, isloading } = useFetchQuiz();
  if (isloading) {
    return
  }

  const showModal = (quizIndex: number) => {
    const modal = document.getElementById(`my_modal_${quizIndex}`) as HTMLDialogElement | null;

    if (modal) {
      modal.showModal();
    }

  };

  const formatTime = (time: string) => {
    return time.length <= 2 ? `${time} min` : `${time} hr`;
  };

  return (
    <>
      {quiz.length ? (
        quiz.map((quizItem, quizIndex) => (

          <div
            className="card w-96 bg-base-100 shadow-xl m-4 cursor-pointer"
            key={quizItem.id}>
            <div className="card-body">
              <h2 className="card-title">{quizItem.title}</h2>
              <p><i className="fa-solid fa-hourglass-start text-2xl"></i> {formatTime(quizItem.time)}</p>
              <p className="h-20 w-full overflow-auto">{quizItem.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => showModal(quizIndex)}>Start</button>
              </div>
            </div>

            <Modal title={quizItem.title} index={quizIndex}>
              <div className="container mx-auto w-full justify-center">
                <div className="block">

                  <p className="border-b p-2"><i className="fa-solid fa-hourglass-start fa-spin text-2xl me-1"></i> {formatTime(quizItem.time)}</p>
                  <div className="p-2 m-2">
                    <p className="truncate w-80">
                      {quizItem.description}
                    </p>
                    <button className="btn btn-active btn-primary absolute bottom-6">
                      <a href="#">
                        start
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
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
