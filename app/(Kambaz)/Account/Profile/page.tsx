import GreenCheckmark from '@/app/(Kambaz)/Courses/[cid]/Modules/GreenCheckmark';
import Link from 'next/link';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormControl,
} from 'react-bootstrap';

export default function Profile() {
  return (
    <div id='wd-profile-screen'>
      <h3>Profile</h3>
      <FormControl
        id='wd-username'
        defaultValue='alice'
        placeholder='Username'
        className='mb-2'
      />
      <FormControl
        id='wd-password'
        defaultValue='123'
        placeholder='Password'
        type='password'
        className='mb-2'
      />
      <FormControl
        id='wd-firstname'
        defaultValue='Alice'
        placeholder='First Name'
        className='mb-2'
      />
      <FormControl
        defaultValue='Wonderland'
        placeholder='Last Name'
        id='wd-lastname'
        className='mb-2'
      />
      <FormControl
        defaultValue='2003-10-16'
        type='date'
        id='wd-dob'
        className='mb-2'
      />
      <FormControl
        defaultValue='alice@wonderland'
        type='email'
        id='wd-email'
        className='mb-2'
      />
      <FormControl
        defaultValue='User'
        type='dropdown'
        id='wd-role'
        className='mb-2'
      />
      <Link href='/Account/Signin' className='btn btn-danger w-100 mb-2'>
        Sign out
      </Link>
    </div>
  );
}
