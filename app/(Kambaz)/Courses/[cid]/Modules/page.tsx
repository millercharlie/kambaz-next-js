'use client';

import * as db from '../../../Database';
import LessonControlButtons from '@/app/(Kambaz)/Courses/[cid]/Modules/LessonControlButtons';
import ModuleControlButtons from '@/app/(Kambaz)/Courses/[cid]/Modules/ModuleControlButtons';
import ModulesControls from '@/app/(Kambaz)/Courses/[cid]/Modules/ModulesControls';
import { useParams } from 'next/navigation';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsGripVertical } from 'react-icons/bs';

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules;
  return (
    <div style={{ minWidth: '40vw' }}>
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />
      {modules
        .filter((module) => module.course === cid)
        .map((module, index) => (
          <ListGroup className='rounded-0' id='wd-modules' key={index}>
            <ListGroupItem className='wd-module p-0 mb-5 fs-5 border-gray'>
              <div className='wd-title p-3 ps-2 bg-secondary'>
                <BsGripVertical className='me-2 fs-3' />
                {module.name}
                <ModuleControlButtons />
              </div>
              {module.lessons && (
                <ListGroup className='wd-lessons rounded-0'>
                  {module.lessons.map((lesson) => (
                    <ListGroupItem
                      className='wd-lesson p-3 ps-1'
                      key={lesson._id}
                    >
                      <BsGripVertical className='me-2 fs-3' />
                      {lesson.name}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        ))}
    </div>
  );
}
