import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOption } from "../redux/quiz.redux";
import { Option } from "../interface/interfaces";

interface QuestionIndex {
    questionIndex: number;
}

export const OptionForm: React.FC<QuestionIndex> = ({ questionIndex }) => {
    const dispatch = useDispatch();
    const [options, setOptions] = useState<Option>({} as Option);
    const { option, isCorrect } = options;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        setOptions((prevOptions) => ({
            ...prevOptions,
            [name]: name === "isCorrect" ? checked : value
        }));
    };

    const handleAddOption = () => {
        if (option.trim() === "") {
            return;
        }


        dispatch(addOption({ questionIndex, option: { option: options.option, isCorrect: options.isCorrect } }));

        setOptions({
            option: '',
            isCorrect: false
        });
    };

    console.log(isCorrect)
    return (
        <form className="p-3">
            <p className="p-3 font-bold">- Agregar opciones:</p>

            <div className="divider">
                <div className={`p-1 rounded-lg text-white ${isCorrect ? 'bg-green-600 ' : 'bg-red-600'}`}>
                    <input
                        type="text"
                        name="option"
                        value={option}
                        onChange={handleChange}
                        placeholder="Opción"
                        className="outline-none p-2"
                    />
                    <label htmlFor="isCorrect">
                        <input
                            type="checkbox"
                            name="isCorrect"
                            checked={isCorrect}
                            onChange={handleChange}
                            className="ms-2 me-1 border-none"
                        />
                        <i className={` ms-2 me-2 ${isCorrect ? 'fa-solid fa-check' : 'fa-solid fa-xmark'}`}></i>
                    </label>
                </div>
            </div>
            <div className="flex w-full justify-center mt-10">
                <button
                    type="button"
                    onClick={handleAddOption}
                    className="p-2 rounded-xl bg-white hover:bg-gray-200 duration-300 transition-all"
                >
                    Agregar Opción
                </button>
            </div>
        </form>
    );
};
