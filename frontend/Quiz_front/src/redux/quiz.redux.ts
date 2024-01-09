import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, Question, Option } from "../interface/interfaces";

interface QuizState {
    quiz: Quiz | null;
}

const initialState: QuizState = {
    quiz: null,
};

const MAX_OPTIONS_PER_QUESTION = 5;

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuiz: (state, action: PayloadAction<Quiz | null>) => {
            state.quiz = action.payload;
        },
        addQuestion: (state, action: PayloadAction<Question>) => {
            if (state.quiz) {
                // Ensure that 'Question' is initialized as an array
                state.quiz.Question = state.quiz.Question || [];
                state.quiz.Question.push({
                    ...action.payload,
                    options: [], // Initialize options array
                });
            }
        },
        removeQuestion: (state, action: PayloadAction<number>) => {
            if (state.quiz && state.quiz.Question) {
                const indexToRemove = action.payload;
                state.quiz.Question.splice(indexToRemove, 1);
            }
        },
        // Corrige el tipo de la propiedad 'option' en el PayloadAction
addOption: (
  state,
  action: PayloadAction<{ questionIndex: number; option: Option }>
) => {
  const { questionIndex, option } = action.payload;
  if (state.quiz && state.quiz.Question && state.quiz.Question[questionIndex]) {
    const question = state.quiz.Question[questionIndex];

    // Asegúrate de que 'options' esté inicializado como un array
    question.options = question.options || [];

    // Limita el número de opciones por pregunta
    if (question.options.length < MAX_OPTIONS_PER_QUESTION) {
      question.options.push(option);
    }
  }
},

        removeOption: (state, action: PayloadAction<{ questionIndex: number; optionIndex: number }>) => {
            const { questionIndex, optionIndex } = action.payload;
            if (state.quiz && state.quiz.Question && state.quiz.Question[questionIndex]) {
                state.quiz.Question[questionIndex].options.splice(optionIndex, 1);
            }
        },
        // Add more reducers as needed
    },
});

export const { setQuiz, addQuestion, removeQuestion, addOption, removeOption } = quizSlice.actions;

export default quizSlice.reducer;
