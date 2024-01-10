import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from "../app/hooks";
import { OptionForm } from "./OptionForm";
import { useDispatch } from "react-redux";
import { removeOption, removeQuestion } from "../redux/quiz.redux";

export const QuestionItem = () => {
  const dispatch = useDispatch();
  const quiz = useAppSelector((state) => state.createQuiz.quiz);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!quiz) {
    return null;
  }

  const { Questions } = quiz;



  const handleToggleExpansion = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      {Questions?.create.map((questionItem, questionIndex) => (
        <div key={questionIndex}>
          <div
            className="shadow-lg m-2 rounded-lg flex justify-between text-center cursor-pointer"
            onClick={() => handleToggleExpansion(questionIndex)}
          >
            <p className="p-2">{questionItem.question}</p>
            <div className="max-h-screen flex">
              <span className="flex p-2">
                <p className="bg-green-400 rounded-lg p-1">{questionItem.points}</p>
                <i className={`relative top-2 ms-2 ${expandedIndex === questionIndex ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'}`}></i>
              </span>
              <button
                onClick={() => dispatch(removeQuestion(questionIndex))}
                type="button"
                className="text-red-600 text-lg h-full hover:bg-red-500 hover:text-white p-2 duration-300 transition-all rounded-r-lg"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: expandedIndex === questionIndex ? 'auto' : 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div>
              {questionItem.options?.create.map((optionItem, optionIndex) => (
                <div key={optionIndex}>
                  <div className={`flex justify-between rounded-lg text-white m-2 ${optionItem.isCorrect ? 'bg-green-600 ' : 'bg-red-600 '}`}>
                    <p className="p-2">{optionItem.option}</p>
                    <button
                      onClick={() => dispatch(removeOption({ questionIndex, optionIndex }))}
                      type="button"
                      className={`text-white text-lg h-full p-2 hover:bg-white duration-300 transition-all rounded-r-lg ${optionItem.isCorrect ? 'hover:text-green-600' : 'hover:text-red-600'}`}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-5 p-3 shadow-lg rounded-lg">
              <OptionForm questionIndex={questionIndex} />
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
