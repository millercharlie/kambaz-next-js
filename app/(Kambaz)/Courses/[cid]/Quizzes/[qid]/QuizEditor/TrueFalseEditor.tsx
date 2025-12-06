import {
  AnswerChoice,
  QuestionType,
  QuizQuestion,
} from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import React from 'react';
import {
  Button,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const TrueFalseEditor: React.FC<{
  question?: QuizQuestion;
  questions: QuizQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
}> = ({ question, questions, setQuestions }) => {
  const initialChoices: AnswerChoice[] = [
    {
      _id: 'true',
      answer: 'True',
      correct: true,
    },
    {
      _id: 'false',
      answer: 'False',
      correct: false,
    },
  ];
  const [editing, setEditing] = React.useState<boolean>(false);
  const [possibleChoices, setPossibleChoices] = React.useState<AnswerChoice[]>(
    question.choices && question.choices.length === 2
      ? question.choices
      : initialChoices
  );

  const handleSaveQuestion = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    console.log(formData.get('choices'));
    const trueCorrect = formData.get('choices') === 'true';
    const choices: AnswerChoice[] = [
      {
        _id: 'true',
        answer: 'True',
        correct: trueCorrect,
      },
      {
        _id: 'false',
        answer: 'False',
        correct: !trueCorrect,
      },
    ];
    console.log(choices);

    const editedQuestion: QuizQuestion = {
      _id: uuidv4(),
      choices,
      points: parseInt(values.points as string),
      question: values.question as string,
      type: QuestionType.BOOLEAN,
    };
    const newQuestions = questions.map((q) =>
      q._id === question._id ? editedQuestion : q
    );
    setQuestions(newQuestions);
    setPossibleChoices(choices);
    setEditing(false);
  };

  return (
    <div className='pt-3'>
      <p>
        <i>
          Enter your question text, then select if True or False is the correct
          answer.
        </i>
      </p>
      <Form onSubmit={handleSaveQuestion}>
        <div className='my-2'>
          <FormLabel htmlFor='wd-quiz-question'>
            <b>Question</b>
          </FormLabel>
          {editing ? (
            <FormControl
              as='textarea'
              id='wd-quiz-question'
              name='question'
              placeholder='Question'
              defaultValue={question.question}
            />
          ) : (
            <p>{question.question}</p>
          )}
        </div>
        <div className='my-2'>
          <FormLabel htmlFor='wd-quiz-points'>
            <b>Points</b>
          </FormLabel>
          {editing ? (
            <FormControl
              id='wd-quiz-points'
              placeholder='Points'
              name='points'
              type='number'
              defaultValue={question.points}
            />
          ) : (
            <p>{question.points}</p>
          )}
        </div>
        <div id='wd-answer-choices'>
          <span>
            <b>Answers</b>
          </span>
          <div>
            <div className='d-flex gap-2 my-2 align-items-center'>
              <FormCheck
                inline
                id='true'
                name='choices'
                value='true'
                type='radio'
                disabled={!editing}
                defaultChecked={possibleChoices[0].correct}
              />
              True
            </div>
            <div className='d-flex gap-2 my-2 align-items-center'>
              <FormCheck
                inline
                id='false'
                name='choices'
                value='false'
                type='radio'
                disabled={!editing}
                defaultChecked={possibleChoices[1].correct}
              />
              False
            </div>
          </div>
        </div>
        <div className='d-flex gap-2 mt-3 align-items-center'>
          {editing ? (
            <>
              <Button
                size='sm'
                variant='secondary'
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
              <Button size='sm' variant='primary' type='submit'>
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                size='sm'
                variant='secondary'
                onClick={() => setEditing(true)}
              >
                Edit Question
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};
export default TrueFalseEditor;
