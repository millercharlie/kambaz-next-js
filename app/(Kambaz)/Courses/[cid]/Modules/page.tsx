import LessonControlButtons from '@/app/(Kambaz)/Courses/[cid]/Modules/LessonControlButtons';
import ModuleControlButtons from '@/app/(Kambaz)/Courses/[cid]/Modules/ModuleControlButtons';
import ModulesControls from '@/app/(Kambaz)/Courses/[cid]/Modules/ModulesControls';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsGripVertical } from 'react-icons/bs';

export default function Modules() {
  return (
    <div style={{ minWidth: '40vw' }}>
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className='rounded-0' id='wd-modules'>
        <ListGroupItem className='wd-module p-0 mb-5 fs-5 border-gray'>
          <div className='wd-title p-3 ps-2 bg-secondary'>
            <BsGripVertical className='me-2 fs-3' /> Week 1
            <ModuleControlButtons />
          </div>
          <ListGroup className='wd-lessons rounded-0'>
            <ListGroupItem className='wd-lesson p-3 ps-1'>
              <BsGripVertical className='me-2 fs-3' /> LEARNING OBJECTIVES
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className='wd-lesson p-3 ps-1'>
              <BsGripVertical className='me-2 fs-3' /> Introduction to the
              course <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className='wd-module p-0 mb-5 fs-5 border-gray'>
          <div className='wd-title p-3 ps-2 bg-secondary'>
            <BsGripVertical className='me-2 fs-3' /> Week 2
            <ModuleControlButtons />
          </div>
          <ListGroup className='wd-lessons rounded-0'>
            <ListGroupItem className='wd-lesson p-3 ps-1'>
              <BsGripVertical className='me-2 fs-3' /> LEARNING OBJECTIVES
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className='wd-lesson p-3 ps-1'>
              <BsGripVertical className='me-2 fs-3' />
              CSS/Bootstrap course <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className='wd-lesson p-3 ps-1'>
              <BsGripVertical className='me-2 fs-3' />
              Learn what is CSS course <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className='wd-module p-0 mb-5 fs-5 border-gray'>
          <div className='wd-title p-3 ps-2 bg-secondary'>
            <BsGripVertical className='me-2 fs-3' />
            Week 3
            <ModuleControlButtons />
          </div>
          <ListGroup className='wd-lessons rounded-0'>
            <ListGroupItem className='wd-lesson p-3 ps-1'>
              <BsGripVertical className='me-2 fs-3' />
              LEARNING OBJECTIVES
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className='wd-lesson p-3 ps-1'>
              <BsGripVertical className='me-2 fs-3' />
              React/TypeScript course <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className='wd-lesson p-3 ps-1'>
              <BsGripVertical className='me-2 fs-3' /> Learn what is React
              course <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
