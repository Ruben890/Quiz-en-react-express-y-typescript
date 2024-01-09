import React, { useState } from "react";
import { Option } from "../interface/interfaces";
import { useDispatch } from "react-redux";
import { addOption } from "../redux/quiz.redux";


interface QuestionIndex {
    questionIndex: number
}
export const OptionForm: React.FC<QuestionIndex> = ({ questionIndex }) => {



    return (
        <form className="p-3">
            <p className="p-3 font-bold">- Agregar opciones:</p>

            <div className="divider">
                <div className="bg-white p-1 rounded-xl">
                    <input
                        type="text"
                        name="options"
                        placeholder="Opción"
                        className="outline-none p-2"
                    />
                    <label htmlFor="isCorrect">
                        <input
                            type="checkbox"
                            name="isCorrect"
                            className="ms-2 me-1"
                        />
                        <i className="fa-solid fa-check ms-2 me-2"></i>
                    </label>
                </div>
            </div>
            <div className="flex w-full justify-center mt-10 ">
                <button type="button" className="p-2 rounded-xl bg-white hover:bg-gray-200 duration-300 transition-all">
                    Agregar Opción
                </button>
            </div>
        </form>
    );
};