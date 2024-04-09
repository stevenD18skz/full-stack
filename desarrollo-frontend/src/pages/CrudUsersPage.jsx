import React from 'react';
import { Navigation } from '../components/Navigation';
import { UsersList } from '../components/UsersList';

export function CrudUsersPage() {
  return (
    <div>
      <div className="w-full p-5 bg-blue-500 shadow-lg flex items-center justify-center">
        <h1 className="text-xl font-medium text-white">
          CRUD DE PRUEBITAS
        </h1>
      </div>
      <Navigation></Navigation>
      <UsersList></UsersList>
    </div>
  )
}