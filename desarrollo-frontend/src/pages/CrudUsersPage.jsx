import React from 'react';
import { Navigation } from '../components/Navigation';
import { UsersList } from '../components/UsersList';
import '../css/CrudUsersStyles.css'

export function CrudUsersPage() {
  return (
    <div className=''>
      <Navigation></Navigation>
      <center className=' px-8 py-6 container-table-users'><UsersList className></UsersList></center>
    </div>
  )
}