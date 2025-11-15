'use client';

import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: 'NodeJS Assignment',
    description: 'Create a NodeJS server with ExpressJS',
    due: '2021-10-10',
    completed: false,
    score: 0,
  });
  const [module, setModule] = React.useState({
    id: 'module',
    name: 'NodeJS Module',
    description: 'Create a NodeJS Module',
    course: 'module_course',
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id='wd-working-with-objects'>
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        id='wd-retrieve-assignments'
        className='btn btn-primary'
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id='wd-retrieve-assignment-title'
        className='btn btn-primary me-2'
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <a
        id='wd-retrieve-module-name'
        className='btn btn-primary'
        href={`${HTTP_SERVER}/lab5/module/name`}
      >
        Get Module Name
      </a>
      <hr />
      <h4>Modifying Properties</h4>
      <div className='mb-4'>
        <FormControl
          className='w-75'
          id='wd-assignment-title'
          defaultValue={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <a
          id='wd-update-assignment-title'
          className='btn btn-primary '
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        >
          Update Title
        </a>
      </div>
      <div className='mb-4'>
        <FormControl
          className='w-75'
          id='wd-module-name'
          defaultValue={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
        <a
          id='wd-update-module-name'
          className='btn btn-primary'
          href={`${MODULE_API_URL}/name/${module.name}`}
        >
          Update Module Name
        </a>
      </div>
      <div className='mb-4'>
        <FormControl
          className='w-75'
          id='wd-module-description'
          defaultValue={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
        <a
          id='wd-update-module-name'
          className='btn btn-primary'
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Module Description
        </a>
      </div>
      <div className='mb-4'>
        <input
          type='number'
          className='w-75'
          id='wd-assignment-score'
          defaultValue={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) })
          }
        />
        <a
          id='wd-update-module-name'
          className='btn btn-primary'
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Assignment Score
        </a>
      </div>
      <div className='form-check form-switch'>
        <label htmlFor='wd-assignment-complete-true'>Completed</label>
        <input
          type='checkbox'
          className='form-check-input'
          checked={assignment.completed}
          id='wd-assignment-complete-true'
          onChange={() =>
            setAssignment({ ...assignment, completed: !assignment.completed })
          }
        />

        <a
          id='wd-update-module-name'
          className='btn btn-primary'
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Assignment Completed
        </a>
      </div>
      <hr />
    </div>
  );
}
