/**
 * Different types of quizzes.
 */
export enum QuizType {
  GRADED_QUIZ = 'graded_quiz',
  PRACTICE_QUIZ = 'practice_quiz',
  GRADED_SURVEY = 'graded_survey',
  UNGRADED_SURVEY = 'ungraded_survey',
}
/**
 * Type of assignment the quiz is a part of ?
 */
export enum AssignmentGroup {
  QUIZZES = 'quizzes',
  EXAMS = 'exams',
  ASSIGNMENTS = 'assignments',
  PROJECT = 'project',
}
/**
 * Various question types.
 */
export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  BOOLEAN = 'true_or_false',
  WRITTEN = 'written',
}

/**
 * Represents a single quiz answer choice.
 */
export type AnswerChoice = {
  _id: string;
  answer: string | number;
  correct: boolean;
};

/**
 * Represents a Quiz with all parameters.
 */
export type Quiz = {
  _id: string;
  title: string;
  description: string;
  type?: QuizType; // `GRADED_QUIZ` is the default
  points: number;
  assignmentGroup?: AssignmentGroup; // `QUIZZES` is the default
  shuffleAnswers?: boolean; // `true` by default
  timeLimit?: number;
  multipleAttempts?: boolean; // `false` by default
  numAttempts?: number; // 1 is the default
  showCorrect: boolean;
  accessCode?: string;
  oneAtATime?: boolean; // `true` by default
  webcam?: boolean; // `false` by default
  lockQuestions?: boolean; // `false` by default
  dueDate: Date;
  published: boolean;
  availableFrom: Date;
  availableUntil: Date;
  questions: QuizQuestion[];
};
/**
 * A type for a single quiz question.
 */
export type QuizQuestion = {
  _id: string;
  question: string;
  points: number;
  type: QuestionType;
  choices: AnswerChoice[];
};

/**
 * Type for a taken quiz
 */
export type TakenQuiz = {
  quizId: string;
  answers: AnswerChoice[];
  finalGrade: number;
  attempt: number;
};

export const draftQuiz: Quiz = {
  _id: 'draft',
  title: 'Draft Quiz',
  description: '',
  availableFrom: new Date('2003-10-16'),
  availableUntil: new Date('2003-10-20'),
  dueDate: new Date('2003-10-20'),
  numAttempts: 1,
  oneAtATime: true,
  points: 100,
  published: false,
  questions: [],
  showCorrect: true,
  shuffleAnswers: true,
  type: undefined,
  webcam: false,
};
