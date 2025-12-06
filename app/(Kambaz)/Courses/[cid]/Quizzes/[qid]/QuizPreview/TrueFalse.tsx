import { QuizQuestion } from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import React from 'react';
import { Form, FormCheck } from 'react-bootstrap';

const TrueFalse: React.FC<{
  question: QuizQuestion;
  index: number;
  chosenAnswers: { questionId: string; answerId: string }[];
  setChosenAnswers: React.Dispatch<
    React.SetStateAction<{ questionId: string; answerId: string }[]>
  >;
}> = ({ question, index, chosenAnswers, setChosenAnswers }) => {
  const handleAnswerChange = (id: string) => {
    const questionExists = chosenAnswers.some(
      (chosen) => chosen.questionId === question._id
    );
    if (questionExists) {
      const newAnswers = chosenAnswers.map((choice) =>
        choice.questionId === question._id
          ? { ...choice, answerId: id }
          : choice
      );
      setChosenAnswers(newAnswers);
    } else {
      setChosenAnswers([
        ...chosenAnswers,
        { questionId: question._id, answerId: id },
      ]);
    }
  };

  return (
    <div className='border'>
      <div className='d-flex justify-content-between p-3 bg-light'>
        <h5>
          <b>Question {index}</b>
        </h5>
        <h6>
          <i>{question.points} pts</i>
        </h6>
      </div>
      <div className='px-3 pt-3'>
        <p>{question.question}</p>
        <hr />
      </div>
      <Form className='px-3 pb-3'>
        <div>
          <div className='d-flex gap-2 my-2 align-items-center'>
            <FormCheck
              inline
              id='true'
              name='answers'
              type='radio'
              defaultChecked={
                !!chosenAnswers.find((c) => c.answerId === 'true')
              }
              onChange={() => handleAnswerChange('true')}
            />
            True
          </div>
          <div className='d-flex gap-2 my-2 align-items-center'>
            <FormCheck
              inline
              id='false'
              name='answers'
              type='radio'
              defaultChecked={
                !!chosenAnswers.find((c) => c.answerId === 'false')
              }
              onChange={() => handleAnswerChange('false')}
            />
            False
          </div>
        </div>
      </Form>
    </div>
  );
};
export default TrueFalse;
