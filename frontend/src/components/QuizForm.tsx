import React, { useState } from "react";
import { NestedQuiz } from "../interface/interfaces";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { setQuiz } from "../redux/quiz.redux";
import { motion } from 'framer-motion'
export const QuizForm = () => {
  const dispatch = useDispatch();
  const [quizData, setQuizData] = useState<NestedQuiz>({} as NestedQuiz);
  const [message, setMessage] = useState<string>("");
  const user = useAppSelector((state) => state.auth.myUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuizData((prevQuizData) => ({ ...prevQuizData, userId: user?.id, [name]: value }));
    if (name === 'time') {
      // Solo aplicar la lógica de formato de tiempo si el nombre es 'time'
      const sanitizedValue = value.replace(/\D/g, ''); // Eliminar caracteres no numéricos

      // Formatear automáticamente como HH:mm
      if (sanitizedValue.length <= 2) {
        // Menos de 3 caracteres, solo añadir los primeros caracteres
        setQuizData((prevQuizData) => ({ ...prevQuizData, userId: user?.id, [name]: `${sanitizedValue}` }));
      } else {
        // Más de 2 caracteres, formatear como HH:mm
        const formattedValue = `${sanitizedValue.slice(0, 2)}:${sanitizedValue.slice(2, 4)}`;
        setQuizData((prevQuizData) => ({ ...prevQuizData, userId: user?.id, [name]: formattedValue }));
      }
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();



    if (!quizData.title || !quizData.description) {
      setMessage("Por favor, complete todos los campos.");
      return;
    }


    dispatch(setQuiz(quizData));
    setMessage("");
  };

  return (
    <>
      <div className="container mx-auto p-3 border relative bottom-6  rounded-lg">
        <h1 className="text-center text-3xl border-b w-full p-2">Crear una nueva prueba</h1>
        <form onSubmit={handleSubmit} className="p-3">
          <div className="m-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="title"
              name="title"
              value={quizData.title}
              onChange={handleChange}
              className="block w-full p-2 m-2"
              maxLength={100}
            />
            <label htmlFor="time" className="block mb-2">
              Time:
            </label>
            <div className="flex items-center">
              <input
                type="text"
                name="time"
                placeholder="HH:mm"
                value={quizData.time}
                onChange={handleChange}
                pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                title="Please enter a valid time in HH:mm format"
                className=" border p-2 m-2 flex-shrink-0 outline-none rounded-s"
              />
              <div className="flex-shrink-0">
                <input type="text"
                  className="border w-12 p-2 rounded-r relative right-2  font-bold text-center "
                  value={quizData.time?.length <= 2 ? 'min' : 'hr'} disabled />
              </div>

            </div>


            <label htmlFor="description" className="block">Description</label>
            <textarea
              name="description"
              placeholder="description"
              value={quizData.description}
              onChange={handleChange}
              className="block resize-none w-full p-2 m-2"
              cols={23}
              rows={4}
              maxLength={500}
            ></textarea>
          </div>

          <div className="w-full flex justify-center  text-white  ">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              type="submit"
              className="p-3 bg-green-400 rounded-lg w-80" >
              <i className="fa-solid fa-play text-2xl"></i>
            </motion.button>
          </div>
        </form>
        <div className="mt-3 w-full flex justify-center ">
          <p className="text-red-600">{message}</p>
        </div>
      </div>
    </>
  );
};
