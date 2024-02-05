import useFetchOption from "../hooks/useFetchOptionsByQuestionId";
import React from "react";
import { useDispatch } from "react-redux";
import { questionSelectOption } from "../redux/quiz.redux";
import { useAppSelector } from "../app/hooks";
interface PropsOptions {
    idQuestions: number | undefined;
    point: number | undefined
}

export const Options: React.FC<PropsOptions> = ({ idQuestions ,point }) => {
    const dispatch = useDispatch();
    const optionSelect = useAppSelector((state) => state.QuizManage.questionSelect)

    const { options, loading } = useFetchOption(idQuestions);

    if (loading) {
        return 
    }


   

    const handleOptionSelect = (id: number | undefined, isCorrect:boolean, option:string) => {
        if(!isCorrect){
            point = 0
        }

        dispatch(questionSelectOption({ questionId: idQuestions, point, option:{id, isCorrect, option}}));
    };

    

    return (
        <div>
            {options.map((optionItem) => (
                <div key={optionItem.id} className="m-5">
                    <div
                       className={`m-3 p-2 rounded-lg border cursor-pointer ${optionSelect && optionSelect.some(option => option.option.id === optionItem.id) && "bg-blue-600 text-white font-bold"}`}
                        onClick={() => handleOptionSelect(optionItem.id, optionItem.isCorrect, optionItem.option)}
                    >
                        <p className="p-2">{optionItem.option}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
