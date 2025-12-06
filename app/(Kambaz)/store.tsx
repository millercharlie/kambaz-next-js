import accountReducer from './Account/reducer';
import assignmentsReducer from './Courses/[cid]/Assignments/reducer';
import modulesReducer from './Courses/[cid]/Modules/reducer';
import quizzesReducer from './Courses/[cid]/Quizzes/reducer';
import coursesReducer from './Courses/reducer';
import enrollmentsReducer from './Dashboard/reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    quizzesReducer,
  },
});
export default store;
