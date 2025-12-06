import {
  AnswerChoice,
  QuestionType,
  QuizQuestion,
} from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import React from 'react';
import { Button, Form, FormControl, FormLabel } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const WrittenResponseEditor: React.FC<{
  question?: QuizQuestion;
  questions: QuizQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
}> = ({ question, questions, setQuestions }) => {
  const initialChoices: AnswerChoice[] = [
    {
      _id: 'default',
      answer: '',
      correct: true,
    },
  ];
  const [editing, setEditing] = React.useState<boolean>(false);
  const [possibleChoices, setPossibleChoices] = React.useState<AnswerChoice[]>(
    question.choices || initialChoices
  );

  const handleSaveQuestion = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    const choices = formData.getAll('choices[]').map<AnswerChoice>((c) => ({
      _id: uuidv4(),
      answer: c as string,
      correct: true,
    }));

    const editedQuestion: QuizQuestion = {
      _id: uuidv4(),
      choices,
      points: parseInt(formValues.points as string),
      question: formValues.question as string,
      type: QuestionType.WRITTEN,
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
          Enter your question text, then define all possible correct answers for
          the blank. Students will see the question followed by a small text box
          to type their answer.
        </i>
      </p>
      <Form
        onSubmit={(event) => {
          handleSaveQuestion(event);
        }}
      >
        <div className='my-2'>
          <FormLabel htmlFor='wd-quiz-question'>
            <b>Question:</b>
          </FormLabel>
          {editing ? (
            <FormControl
              as='textarea'
              id='wd-quiz-question'
              placeholder='Question'
              name='question'
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
            {possibleChoices.map((choice: AnswerChoice, index: number) => (
              <div className='d-flex gap-2 my-2 align-items-center'>
                {editing && (
                  <FormLabel id={index.toString()} className='text-nowrap'>
                    Possible Answer
                  </FormLabel>
                )}
                {editing ? (
                  <>
                    <FormControl
                      as='textarea'
                      name='choices[]'
                      id={index.toString()}
                      defaultValue={choice.answer}
                    />
                    <FaTrash
                      className='text-danger me-2'
                      role='button'
                      onClick={() =>
                        setPossibleChoices(
                          possibleChoices.filter((pc) => pc._id !== choice._id)
                        )
                      }
                    />
                  </>
                ) : (
                  <p style={{ marginBottom: 0 }}>{choice.answer}</p>
                )}
              </div>
            ))}
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
                <Button
                  size='sm'
                  variant='danger'
                  onClick={() =>
                    setPossibleChoices([
                      ...possibleChoices,
                      { _id: uuidv4(), answer: '', correct: false },
                    ])
                  }
                >
                  Add Another Answer
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
        </div>
      </Form>
    </div>
  );
};
export default WrittenResponseEditor;
