'use client';

import { redirect, useParams } from 'next/navigation';

export default function People() {
  const params = useParams();
  redirect(`/Courses/${params.cid}/People/Table`);
}
