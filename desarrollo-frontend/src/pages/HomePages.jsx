import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigation } from '../components/Navigation';

export function HomePage() {
  const [name, setName] = useState(''); // State for the retrieved name
  const [userId, setUserId] = useState(1); // State for the user ID

  useEffect(() => {
    console.log('SE CARGOOO');
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const handleInputChange = (event) => {
    setUserId(parseInt(event.target.value)); // Convert input to integer
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/name/`);
      setName(response.data);
      console.log("se cargo correctamente")
    } catch (error) {
        setName("Usuario no encontrado");
        console.log('!!!!!Error fetching name:', error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <div className="w-full p-5 bg-blue-500 shadow-lg flex items-center justify-center">
        <h1 className="text-xl font-medium text-white">HOME</h1>
      </div>
      <Navigation></Navigation>

      <div className="flex flex-col items-center mt-10 w-2/5 h-96 bg-slate-500/[100] rounded-lg m-8 justify-center">
        <label htmlFor="user-id" className="mb-2 text-gray-700">
          User ID:
        </label>

        <input
          type="number"
          id="user-id"
          className="border border-gray-300 rounded p-2"
          value={userId}
          onChange={handleInputChange}
        />

        <button
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          Get Name
        </button>

        <p className="bg-slate-500 rounded text-center mt-10 ">=== {name} ===</p>
      </div>
    </div>
  );
}
