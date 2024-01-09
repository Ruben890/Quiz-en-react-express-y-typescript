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
       
        state.quiz.Questions = { create: state.quiz.Questions?.create || [] };
        state.quiz.Questions.create.push({
          ...action.payload,
          options: { create: [] }, 
        });
      }
    },
    removeQuestion: (state, action: PayloadAction<number>) => {
      if (state.quiz && state.quiz.Questions) {
        const indexToRemove = action.payload;
        state.quiz.Questions.create.splice(indexToRemove, 1);
      }
    },
    addOption: (
      state,
      action: PayloadAction<{ questionIndex: number; option: Option }>
    ) => {
      const { questionIndex, option } = action.payload;
      if (
        state.quiz &&
        state.quiz.Questions &&
        state.quiz.Questions.create[questionIndex]
      ) {
        const question = state.quiz.Questions.create[questionIndex];

        question.options = { create: question.options?.create || [] };

        if (question.options.create.length < MAX_OPTIONS_PER_QUESTION) {
          question.options.create.push(option);
        }
      }
    },
    removeOption: (
      state,
      action: PayloadAction<{ questionIndex: number; optionIndex: number }>
    ) => {
      const { questionIndex, optionIndex } = action.payload;
      if (
        state.quiz &&
        state.quiz.Questions &&
        state.quiz.Questions.create[questionIndex]
      ) {
        state.quiz.Questions.create[questionIndex].options.create.splice(
          optionIndex,
          1
        );
      }
    },
  
  },
});

export const {
  setQuiz,
  addQuestion,
  removeQuestion,
  addOption,
  removeOption,
} = quizSlice.actions;

export default quizSlice.reducer;
