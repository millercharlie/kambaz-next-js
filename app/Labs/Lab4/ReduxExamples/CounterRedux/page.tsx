import { decrement, increment } from './counterReducer';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export default function CounterRedux() {
  const { count } = useSelector((state: any) => state.counterReducer);
  const dispatch = useDispatch();
  return (
    <div id='wd-counter-redux'>
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <Button
        onClick={() => dispatch(increment())}
        id='wd-counter-redux-increment-click'
      >
        Increment
      </Button>
      <Button
        onClick={() => dispatch(decrement())}
        id='wd-counter-redux-decrement-click'
      >
        Decrement
      </Button>
      <hr />
    </div>
  );
}
