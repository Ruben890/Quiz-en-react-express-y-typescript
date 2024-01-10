import React, { useState } from "react";
import { QuestionItem } from "./QuestionItem";
import { useDispatch } from "react-redux";
import { addQuestion } from "../redux/quiz.redux";
import { useAppSelector } from "../app/hooks";
import './style/QuestionForm.css'
export const FormQuestions = () => {
    const quiz = useAppSelector((state) => state.quiz.quiz)
    const dispatch = useDispatch();
    const [question, setQuestion] = useState<string>('');
    const [points, setPoints] = useState<number>(0);
    const [message, setMessage] = useState<string>('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "question") {
            setQuestion(value);
        } else if (name === "points") {
            setPoints(Number(value));
        }
    };

    const handleAddQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        if (question.trim() === "" || points === 0) {
            setMessage('los capos putons y pregunta estan vacios ')
            return;
        }

        dispatch(addQuestion({ question, points, options: [] }));

        setQuestion('');
        setPoints(0);
    };

    return (
        quiz && <>

            <div className="border relative bottom-6 h-full w-full mt-10 rounded-lg">

                <div className="p-3 rounded-t w-max-screen  border-b  font-bold text-xl text-center" >
                    <p> - {quiz?.title}</p>
                </div>
                <div className="flex w-full justify-around p-3 mt-5">
                    <form className="p-2">
                        <div className="block w-80 m-2">
                            <label htmlFor="text">Pregunta</label>
                            <input
                                type="text"
                                name="question"
                                placeholder="Pregunta"
                                className="block w-full p-2 m-2"
                                value={question}
                                onChange={handleChange}
                            />
                            <label htmlFor="point">Puntos</label>
                            <input
                                type="number"
                                name="points"
                                placeholder="Puntos"
                                className="block w-full p-2 m-2"
                                value={points}
                                onChange={handleChange}
                                min={1}
                                max={100}
                            />
                        </div>

                        <div className="w-full flex justify-center  text-white mt-8"   >
                            <button type="button" className="p-3 bg-green-400 rounded-lg w-80 hover:bg-green-700 duration-300 transition-all" onClick={handleAddQuestion}>
                                Agregar
                            </button>
                        </div>

                        <div className="mt-3 w-full flex justify-center ">
                            <p className="text-red-600">{message}</p>
                        </div>
                    </form>

                    <div className="overflow-auto containerQuetions " style={{ height: '50vh' }}>
                        <QuestionItem />
                    </div>
                </div>

            </div>
        </>
    );
};
