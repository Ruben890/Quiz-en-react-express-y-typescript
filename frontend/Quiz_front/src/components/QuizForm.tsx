import React, { useState } from "react";
import { Quiz } from "../interface/interfaces";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { setQuiz } from "../redux/quiz.redux";

export const QuizForm = () => {
  const dispatch = useDispatch();
  const [quizData, setQuizData] = useState<Quiz>({} as Quiz);
  const [message, setMessage] = useState<string>("");
  const user = useAppSelector((state) => state.auth.myUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuizData((prevQuizData) => ({ ...prevQuizData, userId: user.id, [name]: value }));
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
      <div className="container mx-auto p-3 border relative bottom-6 h-full w-full rounded-lg">
        <form onSubmit={handleSubmit} className="">
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
            <label htmlFor="description">Description</label>
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
            <button type="submit" className="p-3 bg-green-400 rounded-lg w-80 hover:bg-green-700 duration-300 transition-all" ><i className="fa-solid fa-play text-2xl"></i> </button>
          </div>
        </form>
        <div className="mt-3 w-full flex justify-center ">
          <p className="text-red-600">{message}</p>
        </div>
      </div>
    </>
  );
};
