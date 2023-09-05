import React, { useEffect, useReducer } from 'react'

import { AnimalCard } from '../../components/animalComponents/AnimalCard';
import { useNavigate } from 'react-router-dom';
import { FilterToolbar } from '../../components/FilterToolbar';

export const Animals = ({ toggleFavorite, loggedUser, getAnimalsList, animals }) => {

  const nav = useNavigate();

  const initialFilters = {
    type: '',
    minAge: 0,
    maxAge: Number.MAX_VALUE
  }

  const [filters, setFilters] = useReducer((currentValue, patchInfo) => {
    console.log('shit happened in reducer')
    let newValue = { ...currentValue };
    Object.keys(patchInfo).forEach(key => {
      console.log(`Filter ${key} changed from '${currentValue[key]}' to '${patchInfo[key]}'` );
      newValue[key] = patchInfo[key]
    })
    return newValue;
  }, initialFilters);

  useEffect(() => {
    console.log('shit happened in useEffect 1')
    console.log('Animals updated');
    getAnimalsList();
  }, [])

  useEffect(() => {
    if (!loggedUser) {
      console.log('shit happened in useEffect 2')
      nav('/');
    }
  }, []);

  useEffect(() => {
    console.log('Filters changed, ', filters);
    console.log(animals && animals
        .filter(animal => animal.age >= filters.minAge)
        .filter(animal => animal.age <= filters.maxAge)
        .filter(animal => animal.type === filters.type)
        )
  }, [filters]);

  return (
    <div className='animals-page'>
      <FilterToolbar animals={animals} setFilters={setFilters}/>

      <div className='animals'>
        {animals && animals
        .filter(animal => animal.age >= filters.minAge)
        .filter(animal => animal.age <= filters.maxAge)
        .filter(animal => animal.type === filters.type || filters.type === '')
        .map(animal => <AnimalCard animal={animal} key={animal._id} toggleFavorite={toggleFavorite} loggedUser={loggedUser} />)}
      </div>
    </div>
  )
}
