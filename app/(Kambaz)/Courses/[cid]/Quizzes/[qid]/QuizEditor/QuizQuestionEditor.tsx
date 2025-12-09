'use client';

import MultipleChoiceEditor from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizEditor/MultipleChoiceEditor';
import TrueFalseEditor from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizEditor/TrueFalseEditor';
import WrittenResponseEditor from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizEditor/WrittenResponseEditor';
import { setQuizzes } from '@/app/(Kambaz)/Courses/[cid]/Quizzes/reducer';
import {
  QuestionType,
  Quiz,
  QuizQuestion,
  draftQuiz,
} from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import * as client from '@/app/(Kambaz)/Courses/client';
import { redirect, useParams } from 'next/navigation';
import React from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

const QuizQuestionEditor: React.FC<{
  quiz: Quiz;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
}> = ({ quiz, setQuiz }) => {
  const dispatch = useDispatch();
  const [questions, setQuestions] = React.useState<QuizQuestion[]>(
    quiz.questions ?? []
  );
  const { cid, qid } = useParams();

  const handleAddQuestion = (type: QuestionType) => {
    setQuestions([
      ...questions,
      {
        _id: 'draft',
        choices: [],
        points: 0,
        question: '',
        type,
      },
    ]);
  };
  const modifyQuestionType = (type: QuestionType) => {
    setQuestions(
      questions.map((q) => (q._id === 'draft' ? { ...q, type } : q))
    );
  };
  const handleDeleteQuestion = (questionId: string) => {
    console.log('called');
    setQuestions(questions.filter((q) => q._id !== questionId));
  };
  const handleSaveQuestions = () => {
    setQuiz({ ...quiz, questions });
    if (quiz._id !== 'draft') {
      redirect(`/Courses/${cid}/Quizzes/${qid}`);
    } else {
      redirect(`/Courses/${cid}/Quizzes/`);
    }
  };

  const fetchQuizzes = async (cid: string) => {
    const quizzes = await client.fetchQuizzes(cid);
    dispatch(setQuizzes(quizzes));
  };

  React.useEffect(() => {
    quiz === undefined && fetchQuizzes(cid as string);
  }, []);

  const QuestionTypeDropdown: React.FC<{ question: QuizQuestion }> = ({
    question,
  }) => (
    <Dropdown>
      <DropdownToggle>
        {question.type.toUpperCase() || QuestionType.MULTIPLE_CHOICE}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          onClick={() => modifyQuestionType(QuestionType.MULTIPLE_CHOICE)}
        >
          Multiple Choice
        </DropdownItem>
        <DropdownItem onClick={() => modifyQuestionType(QuestionType.BOOLEAN)}>
          True/False
        </DropdownItem>
        <DropdownItem onClick={() => modifyQuestionType(QuestionType.WRITTEN)}>
          Written Response
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  return (
    <div id='wd-quiz-questions-editor'>
      {questions.map((question: QuizQuestion, index: number) => {
        switch (question.type) {
          case QuestionType.MULTIPLE_CHOICE:
            return (
              <div className='my-3 border p-3' key={index}>
                <div>
                  <FaTrash
                    className='text-danger me-2 float-end'
                    role='button'
                    onClick={() => handleDeleteQuestion(question._id)}
                  />
                  {question._id === 'draft' && (
                    <QuestionTypeDropdown question={question} />
                  )}
                </div>
                <MultipleChoiceEditor
                  question={question}
                  questions={questions}
                  setQuestions={setQuestions}
                />
              </div>
            );
          case QuestionType.BOOLEAN:
            return (
              <div className='my-3 border p-3' key={index}>
                <div>
                  <FaTrash
                    className='text-danger me-2 float-end'
                    role='button'
                    onClick={() => handleDeleteQuestion(question._id)}
                  />
                  {question._id === 'draft' && (
                    <QuestionTypeDropdown question={question} />
                  )}
                </div>
                <TrueFalseEditor
                  question={question}
                  questions={questions}
                  setQuestions={setQuestions}
                />
              </div>
            );
          case QuestionType.WRITTEN:
            return (
              <div className='my-3 border p-3' key={index}>
                <div>
                  <FaTrash
                    className='text-danger me-2 float-end'
                    role='button'
                    onClick={() => handleDeleteQuestion(question._id)}
                  />
                  {question._id === 'draft' && (
                    <QuestionTypeDropdown question={question} />
                  )}
                </div>
                <WrittenResponseEditor
                  question={question}
                  key={index}
                  questions={questions}
                  setQuestions={setQuestions}
                />
              </div>
            );
        }
      })}
      <div className='d-flex justify-content-center gap-2'>
        <Button
          variant='danger'
          onClick={() => handleAddQuestion(QuestionType.MULTIPLE_CHOICE)}
        >
          Add Question
        </Button>
      </div>
      <hr />
      <div className='float-end d-flex gap-2'>
        <Button
          variant='secondary'
          onClick={() =>
            qid === draftQuiz._id
              ? redirect(`/Courses/${cid}/Quizzes`)
              : redirect(`/Courses/${cid}/Quizzes/${qid}`)
          }
        >
          Cancel
        </Button>
        <Button
          variant='danger'
          type='submit'
          onClick={(event) => {
            event.preventDefault();
            handleSaveQuestions();
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default QuizQuestionEditor;
