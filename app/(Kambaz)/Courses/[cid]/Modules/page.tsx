'use client';

import * as db from '../../../Database';
import LessonControlButtons from '@/app/(Kambaz)/Courses/[cid]/Assignments/LessonControlButtons';
import {
  deleteAssignment,
  editAssignment,
} from '@/app/(Kambaz)/Courses/[cid]/Assignments/reducer';
import ModuleControlButtons from '@/app/(Kambaz)/Courses/[cid]/Modules/ModuleControlButtons';
import ModulesControls from '@/app/(Kambaz)/Courses/[cid]/Modules/ModulesControls';
import {
  addModule,
  deleteModule,
  editModule,
  updateModule,
} from '@/app/(Kambaz)/Courses/[cid]/Modules/reducer';
import { useParams } from 'next/navigation';
import React from 'react';
import { FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsGripVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

export default function Modules() {
  const { cid } = useParams();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = React.useState('');

  return (
    <div style={{ minWidth: '40vw' }}>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName('');
        }}
      />
      <br />
      <br />
      <br />
      <br />
      {modules
        .filter((module: any) => module.course === cid)
        .map((module: any, index: number) => (
          <ListGroup className='rounded-0' id='wd-modules' key={index}>
            <ListGroupItem className='wd-module p-0 mb-5 fs-5 border-gray'>
              <div className='wd-title p-3 ps-2 bg-secondary'>
                <BsGripVertical className='me-2 fs-3' />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className='w-50 d-inline-block'
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
              {module.lessons && (
                <ListGroup className='wd-lessons rounded-0'>
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      className='wd-lesson p-3 ps-1'
                      key={lesson._id}
                    >
                      <BsGripVertical className='me-2 fs-3' />
                      {lesson.name}
                      <LessonControlButtons
                        assignmentId={lesson._id}
                        deleteAssignment={(assignmentId) =>
                          dispatch(deleteAssignment(assignmentId))
                        }
                      />
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
