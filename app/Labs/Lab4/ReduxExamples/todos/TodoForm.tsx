import { addTodo, setTodo, updateTodo } from './todosReducer';
import React from 'react';
import { Button, FormControl, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(todo);
  }, [todo]);

  return (
    <ListGroupItem>
      <Button onClick={() => dispatch(addTodo(todo))} id='wd-add-todo-click'>
        Add
      </Button>
      <Button
        onClick={() => dispatch(updateTodo(todo))}
        id='wd-update-todo-click'
      >
        Update
      </Button>
      <FormControl
        defaultValue={todo.title}
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
    </ListGroupItem>
  );
}
