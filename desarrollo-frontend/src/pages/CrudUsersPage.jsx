import React from 'react';
import { Navigation } from '../components/Navigation';
import { UsersList } from '../components/UsersList';
import '../css/CrudStyles.css';	

export function CrudUsersPage() {
  return (
    <div>
      <Navigation></Navigation>
      <center><div className="w-4/5 container-table-users">
        <UsersList></UsersList>
      </div></center>
    </div>
  )
}