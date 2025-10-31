'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

export default function CourseNavigation({ open }: { open: boolean }) {
  const params = useParams();
  const pathname = usePathname();
  const links = [
    'Home',
    'Modules',
    'Piazza',
    'Zoom',
    'Assignments',
    'Quizzes',
    'Grades',
    'People',
  ];
  return (
    <div
      id='wd-courses-navigation'
      className='wd list-group fs-5 rounded-0'
      style={{ display: open ? 'block' : 'none' }}
    >
      {links.map((link, index) => (
        <Link
          href={`/Courses/${params.cid}/${link}`}
          key={index}
          id={`wd-course-${link}-link`}
          className={`list-group-item border-0 ${pathname.includes(link) ? 'active' : 'text-danger'}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
