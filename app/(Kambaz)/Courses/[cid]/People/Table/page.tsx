import { Table } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const PeopleTable = () => {
  return (
    <div id='wd-people-table'>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='wd-full-name text-nowrap'>
              <FaUserCircle className='me-2 fs-1 text-secondary' />
              <span className='wd-first-name'>Frederick</span>{' '}
              <span className='wd-last-name'>Olmsted</span>
            </td>
            <td className='wd-login-id'>001234561S</td>
            <td className='wd-section'>S101</td>
            <td className='wd-role'>STUDENT</td>
            <td className='wd-last-activity'>2020-10-01</td>
            <td className='wd-total-activity'>10:21:32</td>
          </tr>
          <tr>
            <td className='wd-full-name text-nowrap'>
              <FaUserCircle className='me-2 fs-1 text-secondary' />
              <span className='wd-first-name'>Frank</span>{' '}
              <span className='wd-last-name'>Gehry</span>
            </td>
            <td className='wd-login-id'>0022197264</td>
            <td className='wd-section'>S101</td>
            <td className='wd-role'>AID</td>
            <td className='wd-last-activity'>2019-2-12</td>
            <td className='wd-total-activity'>08:52:42</td>
          </tr>
          <tr>
            <td className='wd-full-name text-nowrap'>
              <FaUserCircle className='me-2 fs-1 text-secondary' />
              <span className='wd-first-name'>Ulysses</span>{' '}
              <span className='wd-last-name'>Grant</span>
            </td>
            <td className='wd-login-id'>246274129S</td>
            <td className='wd-section'>S101</td>
            <td className='wd-role'>PROFESSOR</td>
            <td className='wd-last-activity'>2020-11-12</td>
            <td className='wd-total-activity'>17:16:15</td>
          </tr>
          <tr>
            <td className='wd-full-name text-nowrap'>
              <FaUserCircle className='me-2 fs-1 text-secondary' />
              <span className='wd-first-name'>Francis</span>{' '}
              <span className='wd-last-name'>Sargent</span>
            </td>
            <td className='wd-login-id'>12872501S</td>
            <td className='wd-section'>S101</td>
            <td className='wd-role'>STUDENT</td>
            <td className='wd-last-activity'>2020-09-29</td>
            <td className='wd-total-activity'>06:15:56</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default PeopleTable;
