'use client';

import LessonControlButtons from '@/app/(Kambaz)/Courses/[cid]/Assignments/LessonControlButtons';
import { deleteAssignment } from '@/app/(Kambaz)/Courses/[cid]/Assignments/reducer';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import React from 'react';
import {
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import 'react-bootstrap';
import InputGroupText from 'react-bootstrap/InputGroupText';
import { BiPlus } from 'react-icons/bi';
import { BsGripVertical } from 'react-icons/bs';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoEllipsisVertical } from 'react-icons/io5';
import { LuClipboardPen } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';

const AssignmentControlButtons = () => (
  <div
    id='assignment-control-buttons'
    className='float-end d-flex justify-content-center align-items-center'
  >
    <div
      style={{
        fontSize: 12,
        borderRadius: 100,
        border: '1px solid gray',
      }}
      className='p-1 me-2'
    >
      40% of Total
    </div>
    <BiPlus className='me-2' />
    <IoEllipsisVertical className='fs-4' />
  </div>
);

const Assignments = () => {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  return (
    <div id='wd-assignments'>
      <div className='d-flex gap-4 mb-lg-5'>
        <InputGroup className='wd-float-left'>
          <InputGroupText id='magnifying-glass'>
            <FaMagnifyingGlass />
          </InputGroupText>
          <FormControl
            placeholder='Search for Assignments'
            id='wd-search-assignment'
          />
        </InputGroup>
        <div className='float-end d-flex gap-2'>
          <Button
            size='lg'
            className='d-flex justify-content-center align-items-center'
            id='wd-add-assignment-group'
            variant='secondary'
          >
            <BiPlus />
            Group
          </Button>
          <Button
            size='lg'
            className='d-flex justify-content-center align-items-center'
            id='wd-add-assignment'
            variant='danger'
            onClick={() =>
              redirect(`/Courses/${cid}/Assignments/draft/AssignmentsEditor`)
            }
          >
            <BiPlus />
            Assignment
          </Button>
        </div>
      </div>
      <div id='wd-assignments-container'>
        <ListGroup className='rounded-0' id='wd-assignments-group'>
          <ListGroupItem className='wd-assignment p-0 mb-5 fs-5 border-gray'>
            <div
              className='wd-title p-3 ps-2 bg-secondary text-capitalize'
              id='wd-assignments-title'
            >
              <BsGripVertical className='me-2 fs-3' />
              ASSIGNMENTS
              <AssignmentControlButtons />
            </div>
            {assignments.map((assignment: any, index: number) => (
              <ListGroup
                className='wd-lessons rounded-0'
                id='wd-assignments-list'
                key={index}
              >
                <ListGroupItem
                  className='wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center'
                  id='wd-assignment-list-item'
                >
                  <div className='d-flex align-items-center gap-2'>
                    <BsGripVertical className='me-2 fs-3' />
                    <LuClipboardPen className='text-success me-2 fs-3' />
                    <div>
                      <Link
                        href={`/Courses/${cid}/Assignments/${assignment._id}`}
                        className='wd-assignment-link text-decoration-none text-black'
                      >
                        {assignment.title}
                      </Link>
                      <p style={{ fontSize: 15 }} className='text-secondary'>
                        <span className='text-danger'>Multiple Modules</span> |{' '}
                        <b>Not available until</b>
                        {' ' +
                          new Date(
                            assignment.availableFrom
                          ).toDateString()}{' '}
                        |<br />
                        <b>Due</b> {new Date(assignment.dueDate).toDateString()}{' '}
                        | {assignment.points} pts
                      </p>
                    </div>
                  </div>
                  <LessonControlButtons
                    assignmentId={assignment._id}
                    deleteAssignment={(assignmentId) =>
                      dispatch(deleteAssignment(assignmentId))
                    }
                  />
                </ListGroupItem>
              </ListGroup>
            ))}
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};
export default Assignments;
