'use client';

import {
  setQuizzes,
  updateQuiz,
} from '@/app/(Kambaz)/Courses/[cid]/Quizzes/reducer';
import {
  AssignmentGroup,
  Quiz,
  QuizType,
  draftQuiz,
} from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import * as client from '@/app/(Kambaz)/Courses/client';
import { redirect, useParams } from 'next/navigation';
import React from 'react';
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const QuizDetailsEditor: React.FC<{
  quiz: Quiz;
  quizzes: Quiz[];
  setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
  editing: boolean;
}> = ({ quiz, quizzes, setQuiz, editing }) => {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const [validated, setValidated] = React.useState<boolean>(false);
  const [publish, setPublish] = React.useState<boolean>(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (publish) {
      editing
        ? onUpdateQuiz({ ...quiz, published: true })
        : onAddQuiz({ ...quiz, published: true });
      redirect(`/Courses/${cid}/Quizzes`);
    } else {
      editing
        ? onUpdateQuiz({ ...quiz, published: false })
        : onAddQuiz({ ...quiz, published: false });
      redirect(
        qid === draftQuiz._id
          ? `/Courses/${cid}/Quizzes`
          : `/Courses/${cid}/Quizzes/${qid}/QuizDetails`
      );
    }
  };

  const onAddQuiz = async (quiz: Quiz) => {
    if (!cid) return;
    const newQuiz = await client.createQuizForCourse(cid as string, quiz);
    dispatch(setQuizzes([...quizzes, newQuiz]));
  };
  const onUpdateQuiz = async (quiz: any) => {
    await client.updateQuiz(quiz);
    const newQuiz = quizzes.map((q: any) => (q._id === quiz._id ? quiz : q));
    dispatch(updateQuiz(newQuiz));
  };
  const modifyQuiz = (event: any, field: string) => {
    console.log(event.target);
    if (field === 'timeLimit') {
      event.target.value === ''
        ? setQuiz({ ...quiz, timeLimit: 20 })
        : setQuiz({ ...quiz, timeLimit: parseInt(event.target.value) });
    } else if (field === 'points' || field === 'numAttempts') {
      setQuiz({ ...quiz, [field]: parseInt(event.target.value) });
    } else if (
      field === 'shuffleAnswers' ||
      field === 'multipleAttempts' ||
      field === 'showCorrect' ||
      field === 'oneAtATime' ||
      field === 'webcam' ||
      field === 'lockQuestions'
    ) {
      setQuiz({ ...quiz, [field]: !quiz[field] });
    } else {
      setQuiz({ ...quiz, [field]: event.target.value });
    }
  };

  return (
    <div id='wd-quiz-details-editor' className='mt-3'>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div>
          <FormLabel htmlFor='wd-name'>
            <b>Assignment Name</b>
          </FormLabel>
          <FormControl
            required
            id='wd-name'
            className='mb-4'
            defaultValue={quiz.title}
            onChange={(event) => modifyQuiz(event, 'title')}
          />
        </div>
        <div>
          <FormControl
            required
            as='textarea'
            id='wd-description'
            defaultValue={quiz.description}
            placeholder='Quiz Description'
            onChange={(event) => modifyQuiz(event, 'description')}
          />
          <Form.Control.Feedback type='invalid'>
            Description is required.
          </Form.Control.Feedback>
        </div>
        <div className='w-75 mb-4 float-end text-nowrap'>
          <div className='d-flex gap-2 my-4 align-items-center'>
            <FormLabel htmlFor='wd-group-1' className='mb-0'>
              Points
            </FormLabel>
            <FormControl
              id='wd-points'
              className='w-25'
              type='number'
              defaultValue={quiz.points}
              onChange={(event) => modifyQuiz(event, 'points')}
            />
          </div>
          <div className='d-flex gap-2 my-4 align-items-center'>
            <FormLabel htmlFor='wd-group-1' className='mb-0'>
              Quiz Type
            </FormLabel>
            <FormSelect
              id='wd-group-1'
              className='text-uppercase'
              onChange={(event) => modifyQuiz(event, 'type')}
            >
              {Object.keys(QuizType).map((qt, index) => (
                <option key={index} value={qt}>
                  {qt}
                </option>
              ))}
            </FormSelect>
          </div>
          <div className='d-flex gap-2 my-4 align-items-center'>
            <FormLabel htmlFor='wd-group-2' className='mb-0'>
              Assignment Group
            </FormLabel>
            <FormSelect
              id='wd-group-2'
              className='text-uppercase'
              onChange={(event) => modifyQuiz(event, 'assignmentGroup')}
            >
              {Object.keys(AssignmentGroup).map((ag, index) => (
                <option key={index} value={ag}>
                  {ag}
                </option>
              ))}
            </FormSelect>
          </div>
          <div className='d-flex gap-2 my-4 align-items-center'>
            <FormLabel htmlFor='wd-passcode' className='mb-0'>
              Access Code
            </FormLabel>
            <FormControl
              id='wd-passcode'
              className='w-25'
              defaultValue={quiz.accessCode}
              placeholder='Access Code'
              onChange={(event) => modifyQuiz(event, 'accessCode')}
            />
          </div>
          <span>
            <b>Options</b>
          </span>
          <div className='my-4 align-items-center'>
            <div className='d-flex gap-2'>
              <FormCheck
                id='wd-shuffle-answers'
                type='switch'
                defaultChecked={quiz.shuffleAnswers}
                label='Shuffle Answers'
                onChange={(event) => modifyQuiz(event, 'shuffleAnswers')}
              />
            </div>
            <div className='d-flex pt-3 gap-2 align-content-center'>
              <FormLabel htmlFor='wd-limit-num'>Time Limit: </FormLabel>
              <FormControl
                id='wd-limit-num'
                type='number'
                className='mb-4 w-25'
                defaultValue={quiz.timeLimit}
                onChange={(event) => modifyQuiz(event, 'timeLimit')}
              />
              <div>Minutes</div>
            </div>
            <div className='d-flex mb-3 gap-2 align-items-center'>
              <FormCheck
                id='wd-multiple-attempts'
                type='switch'
                defaultChecked={quiz.multipleAttempts}
                label='Allow Multiple Attempts'
                onChange={(event) => modifyQuiz(event, 'multipleAttempts')}
              />
              <FormControl
                id='wd-limit-num'
                type='number'
                disabled={!quiz.multipleAttempts}
                className='mb-4 w-25'
                defaultValue={quiz.numAttempts || 1}
                onChange={(event) => modifyQuiz(event, 'numAttempts')}
              />
            </div>
            <div className='d-flex mb-3 gap-2 align-items-center'>
              <FormCheck
                id='wd-correct-answers'
                type='switch'
                defaultChecked={quiz.showCorrect}
                label='Show Correct Answers'
                onChange={(event) => modifyQuiz(event, 'showCorrect')}
              />
            </div>
            <div className='d-flex mb-3 gap-2 align-items-center'>
              <FormCheck
                id='wd-one-at-a-time'
                type='switch'
                defaultChecked={quiz.oneAtATime}
                label='One Question at a Time'
                onChange={(event) => modifyQuiz(event, 'oneAtATime')}
              />
            </div>
            <div className='d-flex mb-3 gap-2 align-items-center'>
              <FormCheck
                id='wd-webcam-required'
                type='switch'
                defaultChecked={quiz.webcam}
                label='Webcam Required'
                onChange={(event) => modifyQuiz(event, 'webcam')}
              />
            </div>
            <div className='d-flex mb-3 gap-2 align-items-center'>
              <FormCheck
                id='wd-lock-questions'
                type='switch'
                defaultChecked={quiz.lockQuestions}
                label='Lock Questions After Answering'
                onChange={(event) => modifyQuiz(event, 'lockQuestions')}
              />
            </div>
          </div>

          <div className='mb-4'>
            <FormLabel htmlFor='wd-due-date'>
              <b>Due</b>
            </FormLabel>
            <FormControl
              id='wd-due-date'
              type='date'
              defaultValue={quiz.dueDate.toLocaleString()}
              onChange={(event) => modifyQuiz(event, 'dueDate')}
            />
          </div>
          <div className='mb-4'>
            <Row>
              <Col>
                <FormLabel htmlFor='wd-available-from'>
                  <b>Available From</b>
                </FormLabel>
                <FormControl
                  id='wd-available-from'
                  type='date'
                  defaultValue={quiz.availableFrom.toLocaleString()}
                  onChange={(event) => modifyQuiz(event, 'availableFrom')}
                />
              </Col>
              <Col>
                <FormLabel htmlFor='wd-available-until'>
                  <b>Until</b>
                </FormLabel>
                <FormControl
                  id='wd-available-until'
                  type='date'
                  defaultValue={quiz.availableUntil.toLocaleString()}
                  onChange={(event) => modifyQuiz(event, 'availableUntil')}
                />
              </Col>
            </Row>
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
              name='submit'
              onClick={() => setPublish(false)}
            >
              Save
            </Button>
            <Button
              variant='primary'
              type='submit'
              name='publish_submit'
              onClick={() => setPublish(true)}
            >
              Save and Publish
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default QuizDetailsEditor;
