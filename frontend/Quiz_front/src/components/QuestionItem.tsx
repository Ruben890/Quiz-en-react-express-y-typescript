import { useAppSelector } from "../app/hooks";
import { OptionForm } from "./OptionForm";

export const QuestionItem = () => {
    const questionItems = useAppSelector((state) => state.quiz.quiz?.Question);

    return (
        <div >
            {questionItems?.map((questionItem, questionIndex) => (
                <div key={questionIndex}>

                    <div className="shadow-lg m-2 rounded-lg  flex justify-between text-center ">

                        <p className="p-2">{questionItem.question}</p>

                        <div className="max-h-screen flex ">
                            <span className="flex p-2">
                                <p className="bg-green-400 rounded-lg p-1">{questionItem.points}</p>
                                <i className="fa-solid fa-chevron-down relative top-2 ms-2"></i>
                            </span>
                            <button
                                type="button"
                                className="text-red-600 text-lg h-full  hover:bg-red-500 hover:text-white p-2 duration-300 transition-all rounded-r-lg">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>

                    <div className="m-5 p-3">
                        <div>
                            {questionItem.options.map((optionItem, optionIndex) => (
                                <div key={optionIndex}>
                                    {optionItem.isCorrect ? (
                                        <p className="border-green-600 rounded-lg p-2 shadow-lg">{optionItem.option}</p>
                                    ) : (
                                        <p className="border-red-600 rounded-lg p-2 shadow-lg">{optionItem.option}</p>
                                    )}
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
