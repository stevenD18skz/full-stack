import React from 'react';
import { Navigation } from '../components/Navigation';

export function HomePage() {
  return (
    <div>
      <div className="w-full p-5 bg-blue-500 shadow-lg flex items-center justify-center">
        <h1 className="text-xl font-medium text-white">
          HOME
        </h1>
      </div>
      <Navigation></Navigation>
    </div>
  )
}