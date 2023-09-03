import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { MyBackendContext } from '../../App'
import { AnimalCard } from '../../components/animalComponents/AnimalCard';

export const Animals = ({toggleFavorite, loggedUser}) => {
  const backendUrl = useContext(MyBackendContext);
  const [animals, setAnimals] = useState([]);
  
  function getAnimalsList(){
    fetch(backendUrl + '/getAnimalsList')
    .then(data => data.json())
    .then(data => setAnimals(data.animals))
  }

  useEffect(() => {
    getAnimalsList();
  }, []);

  return (
    <div className='animals'>
      {animals && animals.map(animal => <AnimalCard animal={animal} key={animal._id} toggleFavorite={toggleFavorite} loggedUser={loggedUser}/>)}
    </div>
  )
}
