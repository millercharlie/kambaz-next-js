'use client';

import * as client from '@/app/(Kambaz)/Account/client';
import { setCurrentUser } from '@/app/(Kambaz)/Account/reducer';
import MultipleChoice from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizPreview/MultipleChoice';
import TrueFalse from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizPreview/TrueFalse';
import WrittenResponse from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizPreview/WrittenResponse';
import QuizResults from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizResults/QuizResults';
import {
  AnswerChoice,
  QuestionType,
  Quiz,
  QuizQuestion,
  TakenQuiz,
} from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import { redirect, useParams } from 'next/navigation';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const QuizPreview: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const [displayedQuestions, setDisplayedQuestions] = React.useState<
    QuizQuestion[]
  >(quiz.oneAtATime ? [quiz.questions[0]] : quiz.questions);
  const [curIndex, setCurIndex] = React.useState<number>(0);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [adminQuiz, setAdminQuiz] = React.useState<TakenQuiz>(null);
  const [chosenAnswers, setChosenAnswers] = React.useState<
    { questionId: string; answerId: string }[]
  >([]);

  const updateUserQuizzes = async (newQuiz: TakenQuiz) => {
    const newAttempt: boolean = !currentUser.takenQuizzes.find(
      (q: TakenQuiz) => q.quizId === newQuiz.quizId
    );
    const updatedUser = await client.updateUser({
      ...currentUser,
      takenQuizzes: newAttempt
        ? [...currentUser.takenQuizzes, newQuiz]
        : currentUser.takenQuizzes.map((q: TakenQuiz) =>
            q.quizId === newQuiz.quizId ? { ...newQuiz } : q
          ),
    });
    dispatch(setCurrentUser(updatedUser));
  };

  const handleSubmit = () => {
    let grade: number = 0;
    const userAnswers: AnswerChoice[] = [];

    quiz.questions.forEach((q) => {
      const correctAnswer: AnswerChoice = q.choices.find((a) => a.correct);
      const userAnswer: { questionId: string; answerId: string } =
        chosenAnswers.find((ca) => ca.questionId === q._id);
      switch (q.type) {
        case QuestionType.MULTIPLE_CHOICE:
          correctAnswer._id === userAnswer.answerId && (grade += q.points);
          userAnswers.push({
            _id: userAnswer.answerId,
            answer: q.choices.find((a) => a._id === userAnswer.answerId)!
              .answer,
            correct: correctAnswer._id === userAnswer.answerId,
          });
          break;
        case QuestionType.BOOLEAN:
          correctAnswer._id === userAnswer.answerId && (grade += q.points);
          userAnswers.push({
            _id: userAnswer.answerId,
            answer: q.choices.find((a) => a._id === userAnswer.answerId)!
              .answer,
            correct: correctAnswer._id === userAnswer.answerId,
          });
          break;
        case QuestionType.WRITTEN:
          const writtenCorrect = q.choices.find(
            (c) => c.answer === userAnswer.answerId
          );
          userAnswers.push({
            _id: userAnswer.answerId,
            answer: userAnswer.answerId,
            correct: !!writtenCorrect,
          });
          writtenCorrect && (grade += q.points);
          break;
      }
    });

    if (currentUser.role !== 'ADMIN') {
      const attempt: number =
        currentUser.takenQuizzes &&
        !!currentUser.takenQuizzes.find((q: TakenQuiz) => q.quizId === quiz._id)
          ? currentUser.takenQuizzes.find(
              (q: TakenQuiz) => q.quizId === quiz._id
            ).attempt + 1
          : 1;
      const finalQuizInfo: TakenQuiz = {
        answers: userAnswers,
        attempt,
        finalGrade: parseInt(((grade / quiz.points) * 100).toFixed(2)),
        quizId: quiz._id,
      };
      updateUserQuizzes(finalQuizInfo);
    } else {
      setAdminQuiz({
        answers: userAnswers,
        attempt: 1,
        finalGrade: parseInt(((grade / quiz.points) * 100).toFixed(2)),
        quizId: quiz._id,
      });
      setShowModal(true);
    }
  };

  const FinalGradeModal = () => (
    <Modal show={showModal}>
      <Modal.Header>
        <b>Congratulations! You completed the quiz.</b>
      </Modal.Header>
      <Modal.Body>
        <QuizResults quiz={quiz} adminAnswers={adminQuiz} />
      </Modal.Body>
    </Modal>
  );

  return (
    <div id='wd-quiz-questions-editor'>
      <FinalGradeModal />
      {displayedQuestions.map((question: QuizQuestion, index: number) => {
        switch (question.type) {
          case QuestionType.MULTIPLE_CHOICE:
            return (
              <div className='my-3' key={index}>
                <MultipleChoice
                  question={question}
                  chosenAnswers={chosenAnswers}
                  setChosenAnswers={setChosenAnswers}
                  index={
                    displayedQuestions.length === 1 ? curIndex + 1 : index + 1
                  }
                />
              </div>
            );
          case QuestionType.BOOLEAN:
            return (
              <div className='my-3' key={index}>
                <TrueFalse
                  question={question}
                  chosenAnswers={chosenAnswers}
                  setChosenAnswers={setChosenAnswers}
                  index={
                    displayedQuestions.length === 1 ? curIndex + 1 : index + 1
                  }
                />
              </div>
            );
          case QuestionType.WRITTEN:
            return (
              <div className='my-3' key={index}>
                <WrittenResponse
                  question={question}
                  chosenAnswers={chosenAnswers}
                  setChosenAnswers={setChosenAnswers}
                  index={
                    displayedQuestions.length === 1 ? curIndex + 1 : index + 1
                  }
                />
              </div>
            );
        }
      })}
      <div className='float-end'>
        {displayedQuestions.length > 1 ? (
          <Button
            size='lg'
            variant='danger'
            type='submit'
            onClick={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </Button>
        ) : (
          <div className='d-flex gap-2'>
            {curIndex > 0 && (
              <Button
                size='lg'
                variant='primary'
                type='submit'
                onClick={(event) => {
                  event.preventDefault();
                  setDisplayedQuestions([quiz.questions[curIndex - 1]]);
                  setCurIndex(curIndex - 1);
                }}
              >
                Previous
              </Button>
            )}
            {curIndex !== quiz.questions.length - 1 && (
              <Button
                size='lg'
                variant='primary'
                type='submit'
                onClick={(event) => {
                  event.preventDefault();
                  setDisplayedQuestions([quiz.questions[curIndex + 1]]);
                  setCurIndex(curIndex + 1);
                }}
              >
                Next
              </Button>
            )}
            {displayedQuestions.length === 1 &&
              displayedQuestions[0]._id ===
                quiz.questions[quiz.questions.length - 1]._id && (
                <Button
                  size='lg'
                  variant='danger'
                  type='submit'
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              )}
          </div>
        )}
      </div>
    </div>
  );
};
export default QuizPreview;
