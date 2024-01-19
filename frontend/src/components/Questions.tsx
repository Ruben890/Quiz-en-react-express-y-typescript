import React from "react";
import useFetchQuestions from "../hooks/useFetchQuestionsByQuizId"
import { Options } from "./Options";
interface PropsQuestions {
    quizId: number | undefined
}

export const Questions: React.FC<PropsQuestions> = ({ quizId }) => {


    const { questions, loading } = useFetchQuestions(Number(quizId));

    if (loading) {
        return
    }
    console.log(questions)

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

                <div className="flex w-full justify-between m-3 mt-10 p-3 border rounded-lg">
                    <button className="p-2 border  rounded-lg text-2xl">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button className="p-2 border  rounded-lg text-2xl" >
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </>
    )
}