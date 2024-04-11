import React from 'react';
import { Navigation } from '../components/Navigation';
import { UsersList } from '../components/UsersList';
import '../css/CrudStyles.css';

export function CrudUsersPage() {
  return (
    <div className='bg-slate-200'>
      <Navigation></Navigation>
      <center className=' px-8 py-6'><UsersList className></UsersList></center>
    </div>
  )
}