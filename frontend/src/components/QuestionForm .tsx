import React, { useState } from "react";
import { QuestionItem } from "./QuestionItem";
import { useDispatch } from "react-redux";
import { addQuestion } from "../redux/quiz.redux";
import { useAppSelector } from "../app/hooks";
import useFetchCreateQuiz from "../hooks/useFetchcreateQuiz";
import { motion } from 'framer-motion'
import './style/QuestionForm.css'
export const FormQuestions = () => {
    const quiz = useAppSelector((state) => state.QuizManage.quiz)
    const dispatch = useDispatch();
    const [question, setQuestion] = useState<string>('');
    const [points, setPoints] = useState<number>(0);
    const [message, setMessage] = useState<string>('')
    const { fetchData } = useFetchCreateQuiz()
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

        dispatch(addQuestion({ question, points }));

        setQuestion('');
        setPoints(0);
    };


    const handleAddQuiz = async () => {
        try {
            if (!quiz?.Questions) {
                setMessage('No se ha creado al menos una pregunta.');
                return;
            }

            const questionsWithoutOptions = quiz.Questions.create.filter(question => !question.options || question.options.create.length === 0);

            if (questionsWithoutOptions.length > 0) {
                setMessage('Al menos una pregunta no tiene opciones agregadas.');
                return;
            }

            setMessage('');

            await fetchData(quiz);
            window.location.reload()

        } catch (error) {
            console.log(error);
        }
    };



    return (
        quiz && <>

            <div className="border relative bottom-6  mt-10 rounded-lg">

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
                                maxLength={80}
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
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="p-3 bg-green-400 rounded-lg w-80"
                                onClick={handleAddQuestion}>
                                Agregar
                            </motion.button>
                        </div>


                    </form>

                    <div className="overflow-auto containerQuetions " style={{ height: '50vh' }}>
                        <QuestionItem />
                    </div>
                </div>
                <div className="flex justify-center p-2">
                    <div className="text-center">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            onClick={handleAddQuiz}
                            className="bg-green-400 p-3 w-80 rounded-lg text-white text-xl">
                            Create prueba
                        </motion.button>
                        <p className="text-red-600 m-3">{message}</p>
                    </div>
                </div>
            </div>
        </>
    );
};
