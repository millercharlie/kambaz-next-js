'use client';

import * as client from '../../client';
import PeopleTable from '@/app/(Kambaz)/Courses/[cid]/People/Table/page';
import { redirect, useParams } from 'next/navigation';
import React from 'react';

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    const validUsers = await client.findUsersForCourse(cid as string);
    setUsers(validUsers);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
