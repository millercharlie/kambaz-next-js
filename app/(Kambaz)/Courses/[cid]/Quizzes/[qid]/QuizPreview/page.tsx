import QuizPreview from './QuizPreview';
import { Quiz } from '@/app/(Kambaz)/Courses/[cid]/Quizzes/types';
import * as client from '@/app/(Kambaz)/Courses/client';

export default async function QuizDetailsPage({ params }) {
  const { qid } = params;
  const quiz: Quiz = await client.fetchQuiz(qid);

  return <QuizPreview quiz={quiz} />;
}
