import GreenCheckmark from '../Modules/GreenCheckmark';
import { redirect, useParams } from 'next/navigation';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { IoEllipsisVertical } from 'react-icons/io5';

const DeleteAssignmentModal = ({
  show,
  setShow,
  assignmentId,
  deleteAssignment,
}: {
  show: boolean;
  setShow: any;
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        Are you sure you want to remove this assignment?
      </Modal.Header>
      <Modal.Footer>
        <Button
          variant='danger'
          onClick={() => {
            setShow(false);
            deleteAssignment(assignmentId);
          }}
        >
          Yes
        </Button>
        <Button variant='secondary' onClick={() => setShow(false)}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function LessonControlButtons({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) {
  const [show, setShow] = React.useState(false);
  const { cid } = useParams();
  return (
    <div className='float-end'>
      <DeleteAssignmentModal
        show={show}
        setShow={setShow}
        assignmentId={assignmentId}
        deleteAssignment={deleteAssignment}
      />
      <FaPencil
        onClick={() =>
          redirect(
            `/Courses/${cid}/Assignments/${assignmentId}/AssignmentsEditor`
          )
        }
        className='text-primary me-2'
        role='button'
        href={`/Courses/${cid}/Assignments/${assignmentId}/AssignmentEditor`}
      />
      <FaTrash
        className='text-danger me-2'
        role='button'
        onClick={() => setShow(true)}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className='fs-4' />
    </div>
  );
}
