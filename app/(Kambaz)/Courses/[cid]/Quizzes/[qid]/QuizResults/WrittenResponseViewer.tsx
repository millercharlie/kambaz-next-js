import {
  AnswerChoice,
  QuizQuestion,
} from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import React from 'react';
import { Form } from 'react-bootstrap';
import { BiSolidErrorCircle } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';
import { FaRegCircle } from 'react-icons/fa6';

const WrittenResponseViewer: React.FC<{
  question: QuizQuestion;
  index: number;
  chosenAnswer: AnswerChoice;
}> = ({ question, index, chosenAnswer }) => {
  return (
    <div className='border'>
      <div className='d-flex justify-content-between p-3 bg-light'>
        <h5>
          <b>Question {index}</b>
        </h5>
        <h6>
          <i>{`${chosenAnswer.correct ? question.points : 0} / ${question.points} pts`}</i>
        </h6>
      </div>
      <div className='px-3 pt-3'>
        <p>{question.question}</p>
        <hr />
      </div>
      <Form className='px-3 pb-3'>
        <div>
          <div className='d-flex gap-2 my-2 align-items-center'>
            {chosenAnswer.correct ? (
              <FaCheckCircle className='text-success' />
            ) : (
              <BiSolidErrorCircle className='text-danger' />
            )}
            {chosenAnswer.answer}
          </div>
          {!chosenAnswer.correct &&
            question.choices.map(
              (choice) =>
                choice.answer !== chosenAnswer._id && (
                  <div className='d-flex gap-2 my-2 align-items-center'>
                    <FaCheckCircle className='text-muted' />
                    {choice.answer}
                  </div>
                )
            )}
        </div>
      </Form>
    </div>
  );
};
export default WrittenResponseViewer;
