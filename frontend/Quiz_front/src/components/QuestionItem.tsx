import { useAppSelector } from "../app/hooks";
import { OptionForm } from "./OptionForm";
import { useDispatch } from "react-redux";
import { removeOption, removeQuestion } from "../redux/quiz.redux";

export const QuestionItem = () => {
  const dispatch = useDispatch();
  const quiz = useAppSelector((state) => state.createQuiz.quiz);

  if (!quiz) {
    return null; // Manejar el caso cuando quiz es null
  }

  const { Questions } = quiz;

  return (
    <div>
      {Questions?.create.map((questionItem, questionIndex) => (
        <div key={questionIndex}>
          <div className="shadow-lg m-2 rounded-lg  flex justify-between text-center ">
            <p className="p-2">{questionItem.question}</p>
            <div className="max-h-screen flex">
              <span className="flex p-2">
                <p className="bg-green-400 rounded-lg p-1">{questionItem.points}</p>
                <i className="fa-solid fa-chevron-down relative top-2 ms-2"></i>
              </span>
              <button
                onClick={() => dispatch(removeQuestion(questionIndex))}
                type="button"
                className="text-red-600 text-lg h-full  hover:bg-red-500 hover:text-white p-2 duration-300 transition-all rounded-r-lg">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          <div className="m-5 p-3">
            <div>
              {questionItem.options?.create.map((optionItem, optionIndex) => (
                <div key={optionIndex}>
                  <div className={`flex justify-between rounded-lg text-white  m-2 ${optionItem.isCorrect ? 'bg-green-600 ' : 'bg-red-600 '}`}>
                    <p className="p-2">{optionItem.option}</p>
                    <button
                      onClick={() => dispatch(removeOption({ questionIndex, optionIndex }))}
                      type="button"
                      className={`text-white  text-lg h-full   p-2 hover:bg-white  duration-300 transition-all rounded-r-lg ${optionItem.isCorrect ? 'hover:text-green-600' : 'hover:text-red-600'}`}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-lg">
              <OptionForm questionIndex={questionIndex} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
