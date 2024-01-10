import { configureStore } from "@reduxjs/toolkit";
import authUserRedux from "../redux/authUser.redux";
import quizRedux from "../redux/quiz.redux";

export const store = configureStore({
    reducer: {
        auth: authUserRedux,
        createQuiz: quizRedux
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;