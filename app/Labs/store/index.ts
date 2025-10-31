import helloReducer from '../Lab4/ReduxExamples/HelloRedux/helloReducer';
import addReducer from '@/app/Labs/Lab4/ReduxExamples/AddRedux/addReducer';
import counterReducer from '@/app/Labs/Lab4/ReduxExamples/CounterRedux/counterReducer';
import todosReducer from '@/app/Labs/Lab4/ReduxExamples/todos/todosReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { helloReducer, counterReducer, addReducer, todosReducer },
});
export default store;
