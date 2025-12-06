'use client';

import * as client from '../Courses/client';
import { setCourses, updateCourse } from '@/app/(Kambaz)/Courses/reducer';
import { setEnrollments } from '@/app/(Kambaz)/Dashboard/reducer';
import Link from 'next/link';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = React.useState<any>({
    _id: '0',
    name: 'New Course',
    number: 'New Number',
    startDate: '2023-09-10',
    endDate: '2023-12-15',
    image: '/images/reactjs.jpg',
    description: 'New Description',
  });

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };
  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      )
    );
  };

  const fetchAllCourses = async () => {
    const allCourses = await client.fetchAllCourses();
    dispatch(setCourses(allCourses));
  };

  const fetchCoursesForUser = async () => {
    const enrollments = await client.fetchCoursesForUser(currentUser._id);
    setDisplayedCourses(enrollments);
    dispatch(setEnrollments(enrollments));
  };
  const onEnrollUser = async (course) => {
    await client.enrollIntoCourse(currentUser._id, course._id);
    dispatch(setEnrollments([...enrollments, course]));
  };
  const onUnenrollUser = async (course) => {
    await client.unenrollFromCourse(currentUser._id, course._id);
    dispatch(
      setEnrollments(enrollments.filter((e: any) => e._id !== course._id))
    );
  };

  React.useEffect(() => {
    setDisplayedCourses(enrollments);
  }, [enrollments]);
  React.useEffect(() => {
    setDisplayedCourses(courses);
  }, [courses]);

  React.useEffect(() => {
    fetchCoursesForUser();
    fetchAllCourses();
  }, []);

  const isEnrolled = React.useCallback(
    (curCourse: any) =>
      enrollments
        ? enrollments.map((e) => e._id).includes(curCourse._id)
        : false,
    [courses, enrollments]
  );

  const [displayedCourses, setDisplayedCourses] = React.useState(enrollments);

  const handleDisplayedCourses = () => {
    if (displayedCourses.length < courses.length) {
      setDisplayedCourses(courses);
    } else {
      setDisplayedCourses(enrollments);
    }
  };

  return (
    <div id='wd-dashboard'>
      <div className='d-flex justify-content-between'>
        <h1 id='wd-dashboard-title'>Dashboard</h1>
        <Button id='wd-enrollments' onClick={() => handleDisplayedCourses()}>
          Enrollments
        </Button>
      </div>
      <hr />
      <h5>
        New Course
        <button
          className='btn btn-primary float-end'
          id='wd-add-new-course-click'
          onClick={onAddNewCourse}
        >
          Add
        </button>
        <button
          className='btn btn-warning float-end me-2'
          onClick={onUpdateCourse}
          id='wd-update-course-click'
        >
          Update
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className='mb-2'
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        // rows={3} WebStorm doesn't like this prop
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <h2 id='wd-dashboard-published'>Published Courses ({courses.length})</h2>
      <hr />
      <div id='wd-dashboard-courses'>
        <Row xs={1} md={5} className='g-4'>
          {displayedCourses.map((course: any, index: number) => (
            <Col
              className='wd-dashboard-course'
              style={{ width: '300px' }}
              key={index}
            >
              <Card>
                <Link
                  href={isEnrolled(course) ? `/Courses/${course._id}/Home` : ''}
                  className='wd-dashboard-course-link text-decoration-none text-dark'
                >
                  <CardImg
                    src={`${course.image}` || 'reactjs.jpg'}
                    variant='top'
                    width='100%'
                    height={160}
                  />
                  <CardBody className='card-body'>
                    <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>
                      {course.name}
                    </CardTitle>
                    <CardText
                      className='wd-dashboard-course-description overflow-hidden'
                      style={{ height: '100px' }}
                    >
                      {course.description}
                    </CardText>
                    <div className='d-flex'>
                      <Button variant='primary'> Go </Button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          onDeleteCourse(course._id);
                        }}
                        className='btn btn-danger float-end'
                        id='wd-delete-course-click'
                      >
                        Delete
                      </button>
                      <button
                        id='wd-edit-course-click'
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className='btn btn-warning me-2 float-end'
                      >
                        Edit
                      </button>
                      <button
                        id='wd-enrolled-in-course'
                        onClick={(event) => {
                          event.preventDefault();
                          isEnrolled(course)
                            ? onUnenrollUser(course)
                            : onEnrollUser(course);
                        }}
                        className={`btn ${isEnrolled(course) ? 'btn-danger' : 'btn-success'} me-2 float-end`}
                      >
                        {isEnrolled(course) ? 'Unenroll' : 'Enroll'}
                      </button>
                    </div>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
