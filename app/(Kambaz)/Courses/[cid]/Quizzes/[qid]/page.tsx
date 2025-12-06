'use client';

import { redirect, useParams } from 'next/navigation';

const QuizPage = () => {
  const { cid, qid } = useParams();
  redirect(`/Courses/${cid}/Quizzes/${qid}/QuizDetails`);
};
export default QuizPage;
