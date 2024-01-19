import React from "react";
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


  if (loading) {
    return
  }



  return (
    <>
      <div>
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

        <div className="absolute bottom-5 w-full left-0">
          <Pagination pagination={pagination} />
        </div>
      </div>
    </>
  );
};
