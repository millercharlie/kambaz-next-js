import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      );
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
  },
});

export const { updateQuiz, setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;
