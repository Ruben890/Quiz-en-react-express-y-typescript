import React, { useEffect } from "react";
import useFetchQuestions from "../hooks/useFetchQuestionsByQuizId";
import { Options } from "./Options";
import { Pagination } from "./paginations";
import usePagination from "../hooks/usePagination";

interface PropsQuestions {
  quizId: number | undefined;
}

export const Questions: React.FC<PropsQuestions> = ({ quizId }) => {
  const { questions, loading } = useFetchQuestions(Number(quizId));

  const pageSize = 1;
  const pagination = usePagination({
    itemsPerPages: pageSize,
    items: questions,
  });

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
  console.log(pagination.currentPage +1 )
  console.log()
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
                <Options idQuestions={questionItems.id} />
              </div>
            ))}
        </div>
        <div className="flex  justify-center" >
          {
            pagination.currentPage + 1  === pagination.totalPages &&(
              <button className="btn btn-success text-white w-80 text-lg">
                 <a href="#">Terminar prueba</a>
              </button>
            )
          }
        </div>
        <div className="lg:absolute lg:bottom-5 w-full left-0 p-3 mt-3">
          <Pagination pagination={pagination} />
        </div>
      </div>
    </>
  );
};
