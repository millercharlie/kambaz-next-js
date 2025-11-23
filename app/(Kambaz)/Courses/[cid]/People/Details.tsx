import * as client from '../../../Account/client';
import { useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { FaCheck, FaUserCircle } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };
  const saveUserName = async () => {
    const [firstName, lastName] = name.split(' ');
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    console.log(updatedUser);
    setEditingName(false);
    onClose();
  };
  const saveUserRole = async () => {
    const updatedUser = { ...user, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingRole(false);
    onClose();
  };
  const saveUserEmail = async () => {
    const updatedUser = { ...user, email };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingEmail(false);
    onClose();
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;
  return (
    <div className='wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25'>
      <button
        onClick={onClose}
        className='btn position-fixed end-0 top-0 wd-close-details'
      >
        <IoCloseSharp className='fs-1' />
      </button>
      <div className='text-center mt-2'>
        <FaUserCircle className='text-secondary me-2 fs-1' />
      </div>
      <hr />
      <div className='text-danger fs-4 wd-name'>
        {editingName ? (
          <FaCheck
            onClick={() => saveUserName()}
            className='float-end fs-5 mt-2 me-2 wd-save'
          />
        ) : (
          <FaPencil
            onClick={() => setEditingName(true)}
            className='float-end fs-5 mt-2 wd-edit'
          />
        )}
        {!editingName && (
          <div className='wd-name' onClick={() => setEditingName(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editingName && (
          <FormControl
            className='w-50 wd-edit-name'
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                saveUserName();
              }
            }}
          />
        )}
      </div>
      <b>Email:</b>
      {editingEmail ? (
        <FaCheck
          onClick={() => saveUserEmail()}
          className='float-end fs-5 mt-2 me-2 wd-save'
        />
      ) : (
        <FaPencil
          onClick={() => setEditingEmail(true)}
          className='float-end fs-5 mt-2 wd-edit'
        />
      )}
      {!editingEmail && (
        <div className='wd-name' onClick={() => setEditingEmail(true)}>
          {user.email}
        </div>
      )}
      {user && editingEmail && (
        <FormControl
          type='email'
          className='w-50 wd-edit-email'
          defaultValue={user.email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              saveUserEmail();
            }
          }}
        />
      )}
      <b>Roles:</b>
      {editingRole ? (
        <FaCheck
          onClick={() => saveUserEmail()}
          className='float-end fs-5 mt-2 me-2 wd-save'
        />
      ) : (
        <FaPencil
          onClick={() => setEditingRole(true)}
          className='float-end fs-5 mt-2 wd-edit'
        />
      )}
      {!editingRole && (
        <div className='wd-name' onClick={() => setEditingRole(true)}>
          {user.role}
        </div>
      )}
      {user && editingRole && (
        <select
          value={role === '' ? user.role : role}
          onChange={(e) => setRole(e.target.value)}
          className='form-select wd-select-role'
        >
          <option value='STUDENT'>Student</option>
          <option value='TA'>Assistant</option>
          <option value='FACULTY'>Faculty</option>
          <option value='ADMIN'>Administrator</option>
        </select>
      )}
      <br />
      <b>Login ID:</b> <span className='wd-login-id'> {user.loginId} </span>
      <br />
      <b>Section:</b> <span className='wd-section'> {user.section} </span>
      <br />
      <b>Total Activity:</b>
      <span className='wd-total-activity'>{user.totalActivity}</span> <hr />
      <button
        onClick={() => deleteUser(uid)}
        className='btn btn-danger float-end wd-delete'
      >
        Delete
      </button>
      <button
        onClick={onClose}
        className='btn btn-secondary float-end me-2 wd-cancel'
      >
        Cancel
      </button>
    </div>
  );
}
