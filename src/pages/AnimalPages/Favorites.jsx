import React, { useEffect } from 'react'
import { AnimalCard } from '../../components/animalComponents/AnimalCard'
import { useNavigate } from 'react-router-dom';

export const Favorites = ({ animals, loggedUser, toggleFavorite, loginStorageUser }) => {

  const nav = useNavigate();

  async function checkLoggedInformation(){
    if (loggedUser) return;
    console.log('Trying to log from local storage');
    const user = await loginStorageUser();
    if (!user) nav('/');
  }

  useEffect(() => {
    checkLoggedInformation();
  }, []);

  return (
    <div className='favorites-page'>
      <h1>My Favorites</h1>
      <div className="animals">
        {/* {animals && animals.filter(animal => loggedUser.favorites.includes(animal._id))
        .map(animal => <AnimalCard animal={animal} key={animal._id} toggleFavorite={toggleFavorite} loggedUser={loggedUser} />)} */}
        {animals && loggedUser?.favorites
        .map(animalId => <AnimalCard animalId={animalId} animals={animals} key={animalId} toggleFavorite={toggleFavorite} loggedUser={loggedUser} />)}
      </div>
    </div>
  )
}
