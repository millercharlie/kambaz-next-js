'use client';

import {
  addAssignment,
  setAssignments,
  updateAssignment,
} from '@/app/(Kambaz)/Courses/[cid]/Assignments/reducer';
import { setModules } from '@/app/(Kambaz)/Courses/[cid]/Modules/reducer';
import * as client from '@/app/(Kambaz)/Courses/client';
import { redirect, useParams } from 'next/navigation';
import React from 'react';
import {
  Badge,
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const editing = React.useMemo(
    () => assignments.find((a: any) => a._id === aid),
    []
  );

  const [assignment, setAssignment] = React.useState<any>(
    assignments.find((a: any) => a._id === aid) || { course: cid }
  );

  const onAddAssignment = async (assignment: any) => {
    if (!cid) return;
    const newAssignment = await client.createAssignmentForCourse(
      cid as string,
      assignment
    );
    dispatch(setAssignments([...assignments, newAssignment]));
  };
  const onUpdateAssignment = async (assignment: any) => {
    await client.updateAssignment(assignment);
    const newAssignment = assignments.map((a: any) =>
      a._id === assignment._id ? assignment : a
    );
    dispatch(updateAssignment(newAssignment));
  };
  const modifyAssignment = (event: any, field: string) => {
    if (field === 'points') {
      setAssignment({ ...assignment, points: parseInt(event.target.value) });
    } else setAssignment({ ...assignment, [field]: event.target.value });
  };

  const dispatch = useDispatch();
  return (
    <div id='wd-assignments-editor'>
      <Form>
        <div>
          <FormLabel htmlFor='wd-name'>Assignment Name</FormLabel>
          <FormControl
            id='wd-name'
            className='mb-4'
            defaultValue={assignment?.title}
            onChange={(event) => modifyAssignment(event, 'title')}
          />
        </div>
        <FormControl
          as='textarea'
          id='wd-description'
          defaultValue={assignment?.description}
          onChange={(event) => modifyAssignment(event, 'description')}
        />
        <div className='w-75 mb-4 float-end text-nowrap'>
          <div className='d-flex gap-2 my-4 align-items-center'>
            <FormLabel htmlFor='wd-points' className='mb-0'>
              Points
            </FormLabel>
            <FormControl
              id='wd-points'
              defaultValue={assignment?.points}
              onChange={(event) => modifyAssignment(event, 'points')}
            />
          </div>
          <div className='d-flex gap-2 my-4 align-items-center'>
            <FormLabel htmlFor='wd-group' className='mb-0'>
              Assignment Group
            </FormLabel>
            <FormSelect id='wd-group' className='text-uppercase'>
              <option>Assignments</option>
            </FormSelect>
          </div>
          <div className='d-flex gap-2 my-4 align-items-center'>
            <FormLabel htmlFor='wd-display-grade-as' className='mb-0'>
              Display Grade as
            </FormLabel>
            <FormSelect id='wd-display-grade-as' className='text-uppercase'>
              <option>Percentage</option>
            </FormSelect>
          </div>
          <div className='d-flex gap-2 my-4'>
            <FormLabel htmlFor='wd-submission-type' className='mb-0'>
              Submission Type
            </FormLabel>
            <div
              className='w-100'
              style={{
                padding: 10,
                border: '1px solid #dee2e6',
                borderRadius: '12px',
              }}
            >
              <FormSelect id='wd-submission-type' className='text-uppercase'>
                <option>Online</option>
              </FormSelect>
              <p className='pt-3'>
                <b>Online Entry Options</b>
              </p>
              <div className='d-flex gap-2'>
                <FormCheck id='wd-text-entry' type='checkbox' />
                <FormLabel htmlFor='wd-text-entry'>Text Entry</FormLabel>
              </div>
              <div className='d-flex gap-2'>
                <FormCheck id='wd-website-url' type='checkbox' />
                <FormLabel htmlFor='wd-website-url'>Website URL</FormLabel>
              </div>
              <div className='d-flex gap-2'>
                <FormCheck id='wd-media-recordings' type='checkbox' />
                <FormLabel htmlFor='wd-media-recordings'>
                  Media Recordings
                </FormLabel>
              </div>
              <div className='d-flex gap-2'>
                <FormCheck id='wd-student-annotation' type='checkbox' />
                <FormLabel htmlFor='wd-student-annotation'>
                  Student Annotation
                </FormLabel>
              </div>
              <div className='d-flex gap-2'>
                <FormCheck id='wd-file-upload' type='checkbox' />
                <FormLabel htmlFor='wd-file-upload'>File Uploads</FormLabel>
              </div>
            </div>
          </div>
          <div className='d-flex gap-2 my-4'>
            <FormLabel htmlFor='wd-submission-type' className='mb-0'>
              Submission Type
            </FormLabel>
            <div
              className='w-100'
              style={{
                padding: 10,
                border: '1px solid #dee2e6',
                borderRadius: '12px',
              }}
            >
              <div className='mb-4'>
                <FormLabel htmlFor='wd-assign-to'>
                  <b>Assign To</b>
                </FormLabel>
                <FormCheck id='wd-assign-to'>
                  <Badge bg='secondary'>Everyone</Badge>
                </FormCheck>
              </div>
              <div className='mb-4'>
                <FormLabel htmlFor='wd-due-date'>
                  <b>Due</b>
                </FormLabel>
                <FormControl
                  id='wd-due-date'
                  type='date'
                  defaultValue={assignment?.dueDate}
                  onChange={(event) => modifyAssignment(event, 'dueDate')}
                />
              </div>
              <div className='mb-4'>
                <Row>
                  <Col>
                    <FormLabel htmlFor='wd-available-from'>
                      <b>Available From</b>
                    </FormLabel>
                    <FormControl
                      id='wd-available-from'
                      type='date'
                      defaultValue={assignment?.availableFrom}
                      onChange={(event) =>
                        modifyAssignment(event, 'availableFrom')
                      }
                    />
                  </Col>
                  <Col>
                    <FormLabel htmlFor='wd-available-until'>
                      <b>Until</b>
                    </FormLabel>
                    <FormControl
                      id='wd-available-until'
                      type='date'
                      defaultValue='2019-06-08'
                      onChange={(event) =>
                        modifyAssignment(event, 'availableUntil')
                      }
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <hr />
          <div className='float-end d-flex gap-2'>
            <Button
              size='lg'
              variant='secondary'
              onClick={() => redirect(`/Courses/${cid}/Assignments`)}
            >
              Cancel
            </Button>
            <Button
              size='lg'
              variant='danger'
              type='submit'
              onClick={(event) => {
                event.preventDefault();
                editing
                  ? onUpdateAssignment(assignment)
                  : onAddAssignment(assignment);
                redirect(`/Courses/${cid}/Assignments`);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
