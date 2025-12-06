import QuizDetails from './QuizDetails';
import { Quiz } from '@/app/(Kambaz)/Courses/[cid]/Quizzes/page';
import * as client from '@/app/(Kambaz)/Courses/client';

export default async function QuizDetailsPage({ params }) {
  const { qid } = params;

  const quiz: Quiz = await client.fetchQuiz(qid);

  return <QuizDetails quiz={quiz} />;
}
