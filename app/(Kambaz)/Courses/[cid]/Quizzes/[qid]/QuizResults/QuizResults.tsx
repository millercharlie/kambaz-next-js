'use client';

import MultipleChoiceViewer from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizResults/MultipleChoiceViewer';
import TrueFalseViewer from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizResults/TrueFalseViewer';
import WrittenResponseViewer from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizResults/WrittenResponseViewer';
import {
  QuestionType,
  Quiz,
  QuizQuestion,
  TakenQuiz,
} from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import { redirect, useParams } from 'next/navigation';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const QuizResults: React.FC<{ quiz: Quiz; adminAnswers?: TakenQuiz }> = ({
  quiz,
  adminAnswers,
}) => {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const takenQuiz: TakenQuiz =
    currentUser.role === 'ADMIN'
      ? adminAnswers
      : currentUser.takenQuizzes.find((q: TakenQuiz) => q.quizId === quiz._id);

  return (
    <div id='wd-quiz-questions-editor'>
      {quiz.questions.map((question: QuizQuestion, index: number) => {
        switch (question.type) {
          case QuestionType.MULTIPLE_CHOICE:
            return (
              <div className='my-3' key={index}>
                <MultipleChoiceViewer
                  question={question}
                  index={index + 1}
                  chosenAnswer={takenQuiz.answers[index]}
                />
              </div>
            );
          case QuestionType.BOOLEAN:
            return (
              <div className='my-3' key={index}>
                <TrueFalseViewer
                  question={question}
                  index={index + 1}
                  chosenAnswer={takenQuiz.answers[index]}
                />
              </div>
            );
          case QuestionType.WRITTEN:
            return (
              <div className='my-3' key={index}>
                <WrittenResponseViewer
                  question={question}
                  index={index + 1}
                  chosenAnswer={takenQuiz.answers[index]}
                />
              </div>
            );
        }
      })}
      {takenQuiz.finalGrade && (
        <div>{`Final Grade: ${Math.round((takenQuiz.finalGrade / 100) * quiz.points)} / ${quiz.points}, or ${takenQuiz.finalGrade}%`}</div>
      )}
      <div className='float-end'>
        <Button
          variant='primary'
          type='submit'
          onClick={(event) => {
            event.preventDefault();
            redirect(`/Courses/${cid}/Quizzes`);
          }}
        >
          Done
        </Button>
      </div>
    </div>
  );
};
export default QuizResults;
