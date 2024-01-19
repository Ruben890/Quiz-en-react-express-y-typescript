import React from "react";
import useFetchQuestions from "../hooks/useFetchQuestionsByQuizId"
import { Options } from "./Options";
import ReactPaginate from "react-paginate";
interface PropsQuestions {
    quizId: number | undefined
}

export const Questions: React.FC<PropsQuestions> = ({ quizId }) => {


    const { questions, loading } = useFetchQuestions(Number(quizId));

    if (loading) {
        return
    }
  

    return (

        <>
            <div>
                <div>
                    {questions.map((questionItems) => (
                        <div key={questionItems.id}>
                            <div className="flex m-5  shadow-lg rounded-lg justify-between ">
                                <h2 className="p-3 font-bold">{questionItems.question}</h2>
                                <div className="h-full bg-green-500 p-3 rounded-r">
                                    <p> Putos: {questionItems.points}</p>
                                </div>
                            </div>
                            <Options idQuestions={questionItems.id} />
                        </div>
                    ))}
                </div>

               
            </div>
        </>
    )
}