'use client';

import { updateQuiz } from '@/app/(Kambaz)/Courses/[cid]/Quizzes/reducer';
import { Quiz } from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import * as client from '@/app/(Kambaz)/Courses/client';
import { redirect, useParams } from 'next/navigation';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const QuizDetails: React.FC<{ quiz: Quiz; quizzes: Quiz[] }> = ({
  quiz,
  quizzes,
}) => {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();

  const booleanText = React.useCallback(
    (param: boolean) => (param ? 'Yes' : 'No'),
    []
  );

  const onPublishQuiz = async () => {
    await client.updateQuiz({
      ...quiz,
      published: !quiz.published,
    });
    const newQuizzes = quizzes.map((q: Quiz) =>
      q._id === quiz._id ? quiz : q
    );
    dispatch(updateQuiz(newQuizzes));
  };

  return (
    <div id='wd-quiz-editor'>
      <div className='btn d-flex align-items-center'>
        <Button
          variant='secondary'
          className='me-2'
          onClick={() => {
            redirect(`/Courses/${cid}/Quizzes/${qid}/QuizPreview`);
          }}
        >
          Preview
        </Button>
        <Button
          variant='secondary'
          className='me-2'
          onClick={() => {
            redirect(`/Courses/${cid}/Quizzes/${qid}/QuizEditor`);
          }}
        >
          Edit
        </Button>
        <Button
          variant={quiz.published ? 'danger' : 'success'}
          onClick={() => onPublishQuiz()} // TODO: This will publish/unpublish a quiz
        >
          {quiz.published ? 'Unpublish' : 'Publish'}
        </Button>
      </div>
      <h3>{quiz.title}</h3>
      <Table striped>
        <tbody>
          <tr className='wd-quiz-type'>
            <td className='text-nowrap'>Quiz Type</td>
            <td>{quiz.type}</td>
          </tr>
          <tr className='wd-quiz-points'>
            <td className='text-nowrap'>Points</td>
            <td>{quiz.points}</td>
          </tr>
          <tr className='wd-assignment-group'>
            <td className='text-nowrap'>Assignment Group</td>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr className='wd-shuffle-answers'>
            <td className='text-nowrap'>Shuffle Answers</td>
            <td>{booleanText(quiz.shuffleAnswers)}</td>
          </tr>
          <tr className='wd-quiz-time-limit'>
            <td className='text-nowrap'>Time Limit</td>
            <td>
              {quiz.timeLimit ? `${quiz.timeLimit} Minutes` : 'Unlimited Time'}
            </td>
          </tr>
          <tr className='wd-multiple-attempts'>
            <td className='text-nowrap'>Multiple Attempts</td>
            <td>{booleanText(quiz.multipleAttempts)}</td>
          </tr>
          <tr className='wd-multiple-attempts'>
            <td className='text-nowrap'>Number of Attempts</td>
            <td>{`${quiz.numAttempts} ${quiz.numAttempts === 1 ? 'Attempt' : 'Attempts'}`}</td>
          </tr>
          <tr className='wd-show-correct'>
            <td className='text-nowrap'>Show Correct Answers</td>
            <td>{booleanText(quiz.showCorrect)}</td>
          </tr>
          <tr className='wd-one-at-a-time'>
            <td className='text-nowrap'>One Question at a Time</td>
            <td>{booleanText(quiz.oneAtATime)}</td>
          </tr>
          <tr className='wd-webcam-required'>
            <td className='text-nowrap'>Webcam Required</td>
            <td>{booleanText(quiz.webcam)}</td>
          </tr>
          <tr className='wd-quiz-type'>
            <td className='text-nowrap'>Lock Questions After Answering</td>
            <td>{booleanText(quiz.lockQuestions)}</td>
          </tr>
        </tbody>
      </Table>
      <Table>
        <thead>
          <tr>
            <th>Due</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{new Date(quiz.dueDate).toDateString()}</td>
            <td>{new Date(quiz.availableFrom).toDateString()}</td>
            <td>{new Date(quiz.availableUntil).toDateString()}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default QuizDetails;
