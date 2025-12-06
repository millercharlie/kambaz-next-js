import { QuizQuestion } from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import React from 'react';
import { Form, FormCheck } from 'react-bootstrap';

const MultipleChoice: React.FC<{
  question: QuizQuestion;
  index: number;
  chosenAnswers: { questionId: string; answerId: string }[];
  setChosenAnswers: React.Dispatch<
    React.SetStateAction<{ questionId: string; answerId: string }[]>
  >;
}> = ({ question, index, chosenAnswers, setChosenAnswers }) => {
  const handleAnswerChange = (id: string) => {
    // If question exists already -> overwrite
    // If question does not exist -> add
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
          {question.choices.map((choice) => (
            <div className='d-flex gap-2 my-2 align-items-center'>
              <FormCheck
                inline
                id={choice._id}
                name='answers'
                type='radio'
                defaultChecked={
                  !!chosenAnswers.find((c) => c.answerId === choice._id)
                }
                onChange={(event) => handleAnswerChange(event.target.id)}
              />
              {choice.answer}
            </div>
          ))}
        </div>
      </Form>
    </div>
  );
};
export default MultipleChoice;
