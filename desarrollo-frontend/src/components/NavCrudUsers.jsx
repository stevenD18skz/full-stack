import React, { useState } from 'react';

export function NavCrudUsers() {
  const [state, setState] = useState({
    search: '',
    state: '',
    municipality: '',
    neighborhood: '',
  });

  const handleSearchChange = (event) => {
    setState({
      ...state,
      search: event.target.value,
    });
  };

  const handleStateSelect = (event) => {
    setState({
      ...state,
      state: event.target.value,
    });
  };

  const handleMunicipalitySelect = (event) => {
    setState({
      ...state,
      municipality: event.target.value,
    });
    console.log(state.municipality)
  };

  const handleNeighborhoodSelect = (event) => {
    setState({
      ...state,
      neighborhood: event.target.value,
    });
  };

  

  return (
    <div className="customer-dashboard">
      <div className='flex flex-col p-4'>
        <h1 className='text-xl font-bold'>USUARIOS</h1>
        <div className='flex flex-row mb-4'>
          <input
            type="text"
            placeholder="Buscar clientes"
            value={state.search}
            onChange={handleSearchChange}
            className='w-full p-2 border border-gray-300 rounded-md'
          />
        </div>


        <div className='flex flex-row mb-4'>

          <label htmlFor="state" className='mr-2'>Estado:</label>
          <select
            id="state"
            value={state.state}
            onChange={handleStateSelect}
            className='p-2 border border-gray-300 rounded-md'
          >
            <option value="">Todos</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            ...
          </select>


          <label htmlFor="municipality" className='mr-2 ml-4'>Municipio:</label>
          <select
            id="municipality"
            value={state.municipality}
            onChange={handleMunicipalitySelect}
            className='p-2 border border-gray-300 rounded-md'
          >
            <option value="">Todos</option>
            <option value="Birmingham">Birmingham</option>
            <option value="Montgomery">Montgomery</option>
            <option value="Tuscaloosa">Tuscaloosa</option>
            ...
          </select>


          <label htmlFor="neighborhood" className='mr-2 ml-4'>Barrio:</label>
          <select
            id="neighborhood"
            value={state.neighborhood}
            onChange={handleNeighborhoodSelect}
            className='p-2 border border-gray-300 rounded-md'
          >
            <option value="">Todos</option>
            <option value="Avondale">Avondale</option>
            <option value="Crestwood">Crestwood</option>
            <option value="Forest Park">Forest Park</option>
            ...
          </select>
        </div>


      </div>
    </div>
  );
};


