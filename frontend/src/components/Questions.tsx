import React, { useEffect, useState } from "react";
import useFetchQuestions from "../hooks/useFetchQuestionsByQuizId";
import { Options } from "./Options";
import { Pagination } from "./paginations";
import usePagination from "../hooks/usePagination";
import { useAppSelector } from "../app/hooks";
import { Modal } from "./modal";
interface PropsQuestions {
  quizId: number | undefined;
}

export const Questions: React.FC<PropsQuestions> = ({ quizId }) => {
  const optionSelect = useAppSelector((state) => state.QuizManage.questionSelect)
  const { questions, loading } = useFetchQuestions(Number(quizId));
  const [Message, setMessage] = useState<string>()
  const pageSize = 1;
  const pagination = usePagination({
    itemsPerPages: pageSize,
    items: questions,
  });

  const showModal = (quizIndex: number) => {
    const allQuestionsCompleted = pagination.currentPage + 1 === optionSelect?.length;
  
    if (allQuestionsCompleted) {
      setMessage("");
      const modal = document.getElementById(`my_modal_${quizIndex}`) as HTMLDialogElement | null;
  
      if (modal) {
        modal.showModal();
      }
    } else {
      setMessage("Asegúrate de completar todas las preguntas antes de finalizar.");
    }
  };

  

  useEffect(() => {
    const disableCopyPaste = (event: Event) => {
      event.preventDefault();
    };

    const element = document.getElementById("questions-container");
    if (element) {
      element.addEventListener("copy", disableCopyPaste);
      element.addEventListener("cut", disableCopyPaste);
      element.addEventListener("paste", disableCopyPaste);
    }

    return () => {
      if (element) {
        element.removeEventListener("copy", disableCopyPaste);
        element.removeEventListener("cut", disableCopyPaste);
        element.removeEventListener("paste", disableCopyPaste);
      }
    };
  }, []);

  
  if (loading) {
    return null;
  }

 

  return (
    <>
      <div id="questions-container" style={{ userSelect: 'none', MozUserSelect: 'none', WebkitUserSelect: 'none', msUserSelect: 'none' }}>
        <div className="w-full m-2 container mx-auto">
          {questions
            .slice(
              pagination.currentPage * pageSize,
              (pagination.currentPage + 1) * pageSize
            )
            .map((questionItems) => (
              <div key={questionItems.id}>
                <div className="flex m-5  shadow-lg rounded-lg justify-between ">
                  <h2 className="p-3 font-bold">{questionItems.question}</h2>
                  <div className="h-full bg-green-500 p-3 rounded-r text-center text-white">
                    <p className="text-wrap text-lg"><span className="font-bold text-lg">Puntos: </span>{questionItems.points}</p>
                  </div>
                </div>
                <Options idQuestions={questionItems.id} point={questionItems.points} />
              </div>
            ))}
        </div>

        {
          pagination.currentPage + 1 === pagination.totalPages && (
            <>
              <div className="flex  justify-center" >
                <button className="btn btn-success text-white w-80 text-lg" onClick={() => showModal(2)}>
                  <a href="#">Terminar prueba</a>
                </button>
              </div>
              <p className="text-center mt-5 text-xl text-red-600">{Message}</p>
            </>
          )
        }

        <Modal title="Confirmación de finalización" index={2}>
          <div className="container mx-auto w-full flex justify-center">
            <div className="p-4">
              <p className="text-center text-lg">
                ¿Estás seguro de que deseas finalizar la prueba?
              </p>
              <button 
              className="btn btn-active btn-primary absolute bottom-6">
                Finalizar prueba
              </button>
            </div>
          </div>
        </Modal>


        <div className="lg:absolute lg:bottom-0 w-full left-0 p-3 mt-3">
          <Pagination pagination={pagination} />
        </div>
      </div>
    </>
  );
};
