import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NestedQuiz, Question, Option  } from "../interface/interfaces";


interface QuizState {
  quiz: NestedQuiz | null;
}

const initialState: QuizState = {
  quiz: null,
};

const MAX_OPTIONS_PER_QUESTION = 5;

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuiz: (state, action: PayloadAction<NestedQuiz | null>) => {
      state.quiz = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      const { quiz } = state;
      if (quiz) {
        quiz.Questions = { create: quiz.Questions?.create || [] };
        quiz.Questions.create.push({
          ...action.payload,
          options: { create: [] },
        });
      }
    },
    removeQuestion: (state, action: PayloadAction<number>) => {
      const { quiz } = state;
      if (quiz && quiz.Questions) {
        const indexToRemove = action.payload;
        quiz.Questions.create.splice(indexToRemove, 1);
      }
    },
    addOption: (
      state,
      action: PayloadAction<{ questionIndex: number; option: Option }>
    ) => {
      const { quiz } = state;
      const { questionIndex, option } = action.payload;
      if (quiz && quiz.Questions && quiz.Questions.create[questionIndex]) {
        const question = quiz.Questions.create[questionIndex];

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
      const { quiz } = state;
      const { questionIndex, optionIndex } = action.payload;
      if (quiz && quiz.Questions && quiz.Questions.create[questionIndex]) {
        quiz.Questions.create[questionIndex].options.create.splice(
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
