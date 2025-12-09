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
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const MultipleChoiceEditor: React.FC<{
  question?: QuizQuestion;
  questions: QuizQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
}> = ({ question, questions, setQuestions }) => {
  const emptyChoice: AnswerChoice = {
    _id: 'default',
    answer: '',
    correct: false,
  };
  const [editing, setEditing] = React.useState<boolean>(false);
  const [possibleChoices, setPossibleChoices] = React.useState<AnswerChoice[]>(
    question.choices ?? [emptyChoice]
  );

  const handleSaveQuestion = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());

    const correctAnswerIndex = Number(formData.get('correct'));

    const choices: AnswerChoice[] = possibleChoices.map((answer, index) => ({
      _id: answer._id,
      answer: formData.get(`choices[${index}][answer]`) as string,
      correct: index === correctAnswerIndex,
    }));

    const editedQuestion: QuizQuestion = {
      _id: uuidv4(),
      choices,
      points: parseInt(formValues.points as string),
      question: formValues.question as string,
      type: QuestionType.MULTIPLE_CHOICE,
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
          Enter your question and multiple answers, then select one correct
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
            {possibleChoices.map((choice: AnswerChoice, index: number) =>
              editing ? (
                <div
                  className='d-flex gap-2 my-3 align-items-center'
                  key={index}
                >
                  <FormCheck
                    inline
                    id={index.toString()}
                    name={`correct`}
                    type='radio'
                    defaultChecked={choice.correct}
                    value={index.toString()}
                  />
                  <FormLabel
                    id={index.toString()}
                    className='text-nowrap'
                  >{`${choice.correct ? 'Correct' : 'Possible'} Answer`}</FormLabel>
                  <FormControl
                    as='textarea'
                    name={`choices[${index}][answer]`}
                    id={index.toString()}
                    defaultValue={choice.answer}
                  />
                  <FaTrash
                    className='text-danger me-2'
                    role='button'
                    onClick={() => {
                      console.log(choice);
                      console.log(choice._id);
                      console.log(possibleChoices);
                      setPossibleChoices(
                        possibleChoices.filter((pc) => pc._id !== choice._id)
                      );
                    }}
                  />
                </div>
              ) : (
                <div className='d-flex gap-2 my-3 align-items-center'>
                  <FormCheck
                    inline
                    id={index.toString()}
                    name='answers'
                    type='radio'
                    defaultChecked={choice.correct}
                    disabled
                  />
                  <p style={{ marginBottom: 0 }}>{choice.answer}</p>
                </div>
              )
            )}
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
export default MultipleChoiceEditor;
