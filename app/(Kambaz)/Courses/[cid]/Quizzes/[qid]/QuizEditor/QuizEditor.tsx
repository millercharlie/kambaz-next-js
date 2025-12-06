'use client';

import QuizDetailsEditor from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizEditor/QuizDetailsEditor';
import QuizQuestionEditor from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizEditor/QuizQuestionEditor';
import { updateQuiz } from '@/app/(Kambaz)/Courses/[cid]/Quizzes/reducer';
import { Quiz } from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import * as client from '@/app/(Kambaz)/Courses/client';
import { useParams } from 'next/navigation';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const QuizzesEditor: React.FC<{ quizzes: Quiz[]; curQuiz: Quiz }> = ({
  quizzes,
  curQuiz,
}) => {
  const { qid } = useParams();
  const dispatch = useDispatch();

  const editing = React.useMemo(
    () =>
      qid === 'draft'
        ? false
        : quizzes.find((q: any) => q._id === qid) !== undefined,
    []
  );

  const [quiz, setQuiz] = React.useState<any>(curQuiz);

  React.useEffect(() => {
    const onUpdateQuiz = async () => {
      await client.updateQuiz(quiz);
      const newQuiz = quizzes.map((q: any) => (q._id === quiz._id ? quiz : q));
      dispatch(updateQuiz(newQuiz));
    };
    onUpdateQuiz();
  }, [quiz]);

  const [detailsEditor, setDetailsEditor] = React.useState<boolean>(true);

  return (
    <div>
      <h2>Quizzes Editor</h2>
      <hr />
      <div className='d-flex gap-2 my-2'>
        <Button
          variant={detailsEditor ? 'primary' : 'secondary'}
          onClick={() => {
            setDetailsEditor(true);
          }}
        >
          Details
        </Button>
        <Button
          variant={!detailsEditor ? 'primary' : 'secondary'}
          onClick={() => {
            setDetailsEditor(false);
          }}
        >
          Questions
        </Button>
      </div>
      {detailsEditor ? (
        <QuizDetailsEditor
          quiz={quiz}
          setQuiz={setQuiz}
          quizzes={quizzes}
          editing={editing}
        />
      ) : (
        <QuizQuestionEditor quiz={quiz} setQuiz={setQuiz} />
      )}
    </div>
  );
};
export default QuizzesEditor;
