import QuizResults from '@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizResults/QuizResults';
import { Quiz } from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import * as client from '@/app/(Kambaz)/Courses/client';

export default async function QuizDetailsPage({ params }) {
  const { qid } = params;
  const quiz: Quiz = await client.fetchQuiz(qid);

  return <QuizResults quiz={quiz} />;
}
