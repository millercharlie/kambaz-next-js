import QuizDetails from './QuizDetails';
import { Quiz } from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import * as client from '@/app/(Kambaz)/Courses/client';

export default async function QuizDetailsPage({ params }) {
  const { cid, qid } = params;

  const quiz: Quiz = await client.fetchQuiz(qid);
  const quizzes: Quiz[] = await client.fetchQuizzes(cid);

  return <QuizDetails quiz={quiz} quizzes={quizzes} />;
}
