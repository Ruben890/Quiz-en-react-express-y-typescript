import useFetchOption from "../hooks/useFetchOptionsByQuestionId";
import React, { useState } from "react";

interface PropsOptions {
    idQuestions: number | undefined;
}

export const Options: React.FC<PropsOptions> = ({ idQuestions }) => {
    const [selectOption, setSelectoption] = useState<number | undefined>()
    const { options, loading } = useFetchOption(idQuestions);
    if (loading) {
        return
    }


    return (
        <div>
            {options.map((optionItem) => (
                <div key={optionItem.id} className="m-5">
                    <div
                        className={`m-3 p-2 rounded-lg border cursor-pointer ${selectOption == optionItem.id && "bg-blue-600 text-white font-bold"}`}
                        onClick={() => setSelectoption(optionItem.id)}
                    >
                        <p className="p-2">{optionItem.option}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
