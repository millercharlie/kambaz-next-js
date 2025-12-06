import QuizEditor from './QuizEditor';
import { Quiz, draftQuiz } from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import * as client from '@/app/(Kambaz)/Courses/client';

export default async function QuizDetailsPage({ params }) {
  const { cid, qid } = params;

  const quizzes: Quiz[] = await client.fetchQuizzes(cid);
  const quiz: Quiz = (await client.fetchQuiz(qid)) || draftQuiz;

  return <QuizEditor quizzes={quizzes} curQuiz={quiz} />;
}
