import GreenCheckmark from '@/app/(Kambaz)/Courses/[cid]/Modules/GreenCheckmark';
import { BsPlus } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';

const ModulesControlButtons = () => (
  <div className='float-end'>
    <GreenCheckmark />
    <BsPlus />
    <IoEllipsisVertical className='fs-4' />
  </div>
);

export default ModulesControlButtons;
