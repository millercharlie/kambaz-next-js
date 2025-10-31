'use client';

import CourseNavigation from './Navigation';
import { useParams } from 'next/navigation';
import React, { ReactNode } from 'react';
import { FaAlignJustify } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = React.useState(true);
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  return (
    <div id='wd-courses'>
      <h2>
        <FaAlignJustify
          className='me-4 fs-4 mb-1'
          onClick={() => setOpen(!open)}
        />
        {course?.name}
      </h2>

      <hr />
      <div className='d-flex'>
        <div className='d-none d-md-block'>
          <CourseNavigation open={open} />
        </div>
        <div className='flex-fill'>{children}</div>
      </div>
    </div>
  );
}
