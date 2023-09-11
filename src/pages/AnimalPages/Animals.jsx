import React, { useEffect, useReducer } from 'react'

import { AnimalCard } from '../../components/animalComponents/AnimalCard';
import { useNavigate } from 'react-router-dom';
import { FilterToolbar } from '../../components/FilterToolbar';
import { useContext } from 'react';
import { MyBackendContext } from '../../App'

export const Animals = ({ toggleFavorite, loggedUser, getAnimalsList, animals, loginStorageUser, types }) => {

  const backendUrl = useContext(MyBackendContext);

  const nav = useNavigate();

  const initialFilters = {
    type: '',
    minAge: 0,
    maxAge: 100,
    showOnlyWithPhotos: false
  }

  const [filters, setFilters] = useReducer((currentValue, patchInfo) => {
    let newValue = { ...currentValue };
    Object.keys(patchInfo).forEach(key => {
      //console.log(`Filter ${key} changed from '${currentValue[key]}' to '${patchInfo[key]}'`);
      newValue[key] = patchInfo[key]
    })
    return newValue;
  }, initialFilters);

  function getMaxValue() {
    const animalAges = animals.map(animal => Number(animal.age));
    return Math.max(...animalAges);
  }

  async function checkLoggedInformation() {
    if (loggedUser) return;
    console.log('Trying to log from local storage');
    const user = await loginStorageUser();
    if (!user) nav('/');
  }

  async function removeAnimal(animalId) {

    const options = {
      method: 'DELETE',
    }

    const res = await fetch(backendUrl+'/removeAnimal/'+animalId, options);
    const data = await res.json();
    console.log(data.message);
    
    if (data.error) return data.error;

    getAnimalsList();
    return data
  }


  useEffect(() => {
    getAnimalsList();
    checkLoggedInformation();
    document.title = 'Animals'
  }, [])

  return (
    <div className='animals-page'>
      <FilterToolbar animals={animals} setFilters={setFilters} getMaxValue={getMaxValue} filters={filters} types={types}/>

      <div className='animals'>
        {animals && animals
          .filter(animal => animal.age >= filters.minAge)
          .filter(animal => animal.age <= filters.maxAge)
          .filter(animal => animal.type === filters.type || filters.type === '')
          .filter(animal => filters.showOnlyWithPhotos ? animal.images.length > 0 : true)
          .map(animal => <AnimalCard animal={animal} key={animal._id} animals={animals} toggleFavorite={toggleFavorite} loggedUser={loggedUser} removeAnimal={removeAnimal} />)}
      </div>
    </div>
  )
}
