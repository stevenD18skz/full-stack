import React from 'react';
import { Navigation } from '../components/Navigation';
import { UsersList } from '../components/UsersList';
import '../css/CrudStyles.css';	

export function CrudUsersPage() {
  return (
    <div>
      <div className="w-full p-5 bg-blue-500 shadow-lg flex items-center justify-center">
        <h1 className="text-xl font-medium text-white">
          CRUD DE PRUEBITAS
        </h1>
      </div>
      <Navigation></Navigation>
      <center><div className="w-4/5 container-table-users">
        <UsersList></UsersList>
      </div></center>
    </div>
  )
}