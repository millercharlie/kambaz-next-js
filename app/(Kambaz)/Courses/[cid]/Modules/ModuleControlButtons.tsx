import GreenCheckmark from '@/app/(Kambaz)/Courses/[cid]/Modules/GreenCheckmark';
import { BsPlus } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { IoEllipsisVertical } from 'react-icons/io5';

const ModulesControlButtons = ({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) => (
  <div className='float-end'>
    <FaPencil
      onClick={() => editModule(moduleId)}
      className='text-primary me-3'
    />
    <FaTrash
      className='text-danger me-2 mb-1'
      role='button'
      onClick={() => deleteModule(moduleId)}
    />
    <GreenCheckmark />
    <BsPlus />
    <IoEllipsisVertical className='fs-4' />
  </div>
);

export default ModulesControlButtons;
