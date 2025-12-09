'use client';

import * as userClient from '@/app/(Kambaz)/Account/client';
import {
  setQuizzes,
  updateQuiz,
} from '@/app/(Kambaz)/Courses/[cid]/Quizzes/reducer';
import {
  Quiz,
  TakenQuiz,
  draftQuiz,
} from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import * as client from '@/app/(Kambaz)/Courses/client';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import React from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { BiPlus, BiRocket, BiSolidDownArrow } from 'react-icons/bi';
import { FaCheckCircle, FaStopCircle } from 'react-icons/fa';
import { IoEllipsisVertical } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

const QuizText: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
  let component;
  if (new Date(quiz.availableFrom).getTime() > new Date().getTime()) {
    component = (
      <p style={{ fontSize: 15 }} className='text-secondary'>
        <b>Not available until</b>
        {' ' + new Date(quiz.availableFrom).toDateString()} | <b>Due</b>{' '}
        {new Date(quiz.dueDate).toDateString()} | {quiz.points} Points |{' '}
        {quiz.questions.length} Questions
        {quiz.numAttempts > 1 && ' | Multiple Attempts'}
      </p>
    );
  } else if (new Date(quiz.availableUntil).getTime() < new Date().getTime()) {
    component = (
      <p style={{ fontSize: 15 }} className='text-secondary'>
        <b>Closed</b> | <b>Due</b> {new Date(quiz.dueDate).toDateString()} |{' '}
        {quiz.points} Points | {quiz.questions.length} Questions
        {quiz.numAttempts > 1 && ' | Multiple Attempts'}
      </p>
    );
  } else {
    component = (
      <p style={{ fontSize: 15 }} className='text-secondary'>
        <b>Available until</b> {new Date(quiz.availableUntil).toDateString()} |{' '}
        <b>Due</b> {new Date(quiz.dueDate).toDateString()} | {quiz.points}{' '}
        Points | {quiz.questions.length} Questions
        {quiz.numAttempts > 1 && ' | Multiple Attempts'}
      </p>
    );
  }

  return component;
};

const Quizzes = () => {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const sortQuizzes = (unsorted: Quiz[]): Quiz[] =>
    unsorted.toSorted(
      (a: Quiz, b: Quiz) =>
        new Date(a.availableFrom).getTime() -
        new Date(b.availableFrom).getTime()
    );

  const [sortedQuizzes, setSortedQuizzes] = React.useState<Quiz[]>(
    sortQuizzes(quizzes)
  );

  const addDraftQuiz = () => {
    dispatch(setQuizzes([...quizzes, draftQuiz]));
    redirect(`/Courses/${cid}/Quizzes/draft/QuizEditor`);
  };
  const fetchQuizzes = async (cid: string) => {
    const quizzes = await client.fetchQuizzes(cid);
    dispatch(setQuizzes(quizzes));
  };
  const onRemoveQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId as string);
    dispatch(setQuizzes(quizzes.filter((m: any) => m._id !== quizId)));
  };
  const onPublishQuiz = async (quiz: Quiz) => {
    await client.updateQuiz({
      ...quiz,
      published: !quiz.published,
    });
    const newQuizzes = quizzes.map((q: Quiz) =>
      q._id === quiz._id ? quiz : q
    );
    dispatch(updateQuiz(newQuizzes));
  };

  const canAccessQuiz = (quiz: Quiz): boolean => {
    if (currentUser.role === 'ADMIN') {
      return true;
    }
    const takenQuiz: TakenQuiz = currentUser.takenQuizzes.find(
      (taken: TakenQuiz) => taken.quizId === quiz._id
    );
    if (!takenQuiz && quiz.published) {
      return true;
    }
    const attempts: number = takenQuiz.attempt;
    console.log(attempts);
    // await userClient.updateUser({
    //   ...currentUser,
    //   takenQuizzes: [],
    // });
    return attempts < quiz.numAttempts;
  };

  React.useEffect(() => {
    fetchQuizzes(cid as string);
  }, [cid]);

  React.useEffect(() => {
    setSortedQuizzes(sortQuizzes(quizzes));
  }, [quizzes]);

  return (
    <div id='wd-quizzes'>
      {currentUser.role === 'ADMIN' && (
        <div className='mb-3'>
          <Button
            size='lg'
            className='d-flex justify-content-center align-items-center'
            id='wd-add-quiz'
            variant='danger'
            onClick={() => {
              addDraftQuiz();
            }}
          >
            <BiPlus />
            Quiz
          </Button>
        </div>
      )}
      <div id='wd-quizzes-container'>
        <ListGroup className='rounded-0' id='wd-quizzes-group'>
          <ListGroupItem className='wd-quiz p-0 mb-5 fs-5 border-gray'>
            <div
              className='wd-title p-3 ps-2 bg-secondary text-capitalize'
              id='wd-quizzes-title'
            >
              <BiSolidDownArrow className='me-2 fs-3' />
              Quizzes
            </div>
            {sortedQuizzes.map((quiz: any, index: number) => {
              if (
                currentUser.role === 'ADMIN' ||
                (currentUser.role !== 'ADMIN' && quiz.published)
              ) {
                return (
                  <ListGroup
                    className='wd-lessons rounded-0'
                    id='wd-quizzes-list'
                    key={index}
                  >
                    <ListGroupItem
                      className='wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center'
                      id='wd-quiz-list-item'
                    >
                      <div className='d-flex align-items-center gap-2'>
                        <BiRocket className='text-success me-2 fs-3' />
                        <div>
                          {canAccessQuiz(quiz) ? (
                            <Link
                              href={`/Courses/${cid}/Quizzes/${quiz._id}/${currentUser.role === 'ADMIN' ? 'QuizDetails' : 'QuizPreview'}`}
                              className='wd-quiz-link text-decoration-none text-black'
                            >
                              {quiz.title}
                            </Link>
                          ) : currentUser.takenQuizzes.find(
                              (taken: TakenQuiz) => taken.quizId === quiz._id
                            ) ? (
                            <Link
                              href={`/Courses/${cid}/Quizzes/${quiz._id}/${currentUser.role === 'ADMIN' ? 'QuizDetails' : 'QuizResults'}`}
                              className='wd-quiz-link text-decoration-none text-black'
                            >
                              {quiz.title}
                            </Link>
                          ) : (
                            <div className='wd-quiz-link text-decoration-none text-black'>
                              {quiz.title} -{' '}
                              <span style={{ fontSize: 15 }}>
                                No Attempts Remaining
                              </span>
                            </div>
                          )}
                          <QuizText quiz={quiz} />
                        </div>
                      </div>
                      {currentUser.role === 'ADMIN' && (
                        <div className='d-flex align-items-center'>
                          {quiz.published ? (
                            <FaCheckCircle
                              className='text-success me-2 fs-3'
                              style={{ cursor: 'pointer' }}
                              onClick={() => onPublishQuiz(quiz)}
                            />
                          ) : (
                            <FaStopCircle
                              className='text-danger me-2 fs-3'
                              style={{ cursor: 'pointer' }}
                              onClick={() => onPublishQuiz(quiz)}
                            />
                          )}
                          <Dropdown>
                            <DropdownToggle
                              style={{
                                background: 'transparent',
                                color: 'black',
                                border: 'none',
                              }}
                            >
                              <IoEllipsisVertical
                                style={{ cursor: 'pointer' }}
                              />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() =>
                                  redirect(
                                    `/Courses/${cid}/Quizzes/${quiz._id}/QuizEditor`
                                  )
                                }
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => onRemoveQuiz(quiz._id)}
                              >
                                Delete
                              </DropdownItem>
                              <DropdownItem onClick={() => onPublishQuiz(quiz)}>
                                {quiz.published ? 'Unpublish' : 'Publish'}
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      )}
                    </ListGroupItem>
                  </ListGroup>
                );
              }
            })}
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};
export default Quizzes;
