import Image from 'next/image';
import Link from 'next/link';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from 'react-bootstrap';

export default function Dashboard() {
  return (
    <div id='wd-dashboard'>
      <h1 id='wd-dashboard-title'>Dashboard</h1> <hr />
      <h2 id='wd-dashboard-published'>Published Courses (7)</h2> <hr />
      <div id='wd-dashboard-courses'>
        <Row xs={1} md={5} className='g-4'>
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link
                href='/Courses/1234/Home'
                className='wd-dashboard-course-link text-decoration-none text-dark'
              >
                <CardImg
                  variant='top'
                  src='/images/reactjs.jpg'
                  width='100%'
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>
                    CS1234 React JS
                  </CardTitle>
                  <CardText
                    className='wd-dashboard-course-description overflow-hidden'
                    style={{ height: '100px' }}
                  >
                    Full Stack software developer
                  </CardText>
                  <Button variant='primary'>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link
                href='/Courses/1235/Home'
                className='wd-dashboard-course-link text-decoration-none text-dark'
              >
                <CardImg
                  variant='top'
                  src='/images/ussr.png'
                  width='100%'
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>
                    HIST1286 History of the Soviet Union
                  </CardTitle>
                  <CardText
                    className='wd-dashboard-course-description overflow-hidden'
                    style={{ height: '100px' }}
                  >
                    A full history of the Union of Soviet Socialist Republics
                    (USSR)
                  </CardText>
                  <Button variant='primary'>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link
                href='/Courses/1236/Home'
                className='wd-dashboard-course-link text-decoration-none text-dark'
              >
                <CardImg
                  variant='top'
                  src='/images/psych.jpg'
                  width='100%'
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>
                    PSYC1000 Psychology 101
                  </CardTitle>
                  <CardText
                    className='wd-dashboard-course-description overflow-hidden'
                    style={{ height: '100px' }}
                  >
                    Introduction to psychology
                  </CardText>
                  <Button variant='primary'>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link
                href='/Courses/1237/Home'
                className='wd-dashboard-course-link text-decoration-none text-dark'
              >
                <CardImg
                  variant='top'
                  src='/images/calc.png'
                  width='100%'
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>
                    MATH2985 Calculus III
                  </CardTitle>
                  <CardText
                    className='wd-dashboard-course-description overflow-hidden'
                    style={{ height: '100px' }}
                  >
                    Multivariable calculus
                  </CardText>
                  <Button variant='primary'>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link
                href='/Courses/1238/Home'
                className='wd-dashboard-course-link text-decoration-none text-dark'
              >
                <CardImg
                  variant='top'
                  src='/images/writing.webp'
                  width='100%'
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>
                    ENGW3382 Advanced Writing
                  </CardTitle>
                  <CardText
                    className='wd-dashboard-course-description overflow-hidden'
                    style={{ height: '100px' }}
                  >
                    Advanced Writing in the Technical Professions
                  </CardText>
                  <Button variant='primary'>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link
                href='/Courses/1239/Home'
                className='wd-dashboard-course-link text-decoration-none text-dark'
              >
                <CardImg
                  variant='top'
                  src='/images/anatomy.png'
                  width='100%'
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>
                    BIO1029 Anatomy
                  </CardTitle>
                  <CardText
                    className='wd-dashboard-course-description overflow-hidden'
                    style={{ height: '100px' }}
                  >
                    Human Anatomy
                  </CardText>
                  <Button variant='primary'>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link
                href='/Courses/1240/Home'
                className='wd-dashboard-course-link text-decoration-none text-dark'
              >
                <CardImg
                  variant='top'
                  src='/images/cs.avif'
                  width='100%'
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>
                    CS3500 Object-Oriented Design
                  </CardTitle>
                  <CardText
                    className='wd-dashboard-course-description overflow-hidden'
                    style={{ height: '100px' }}
                  >
                    Object-Oriented Java Programming
                  </CardText>
                  <Button variant='primary'>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
