import React from 'react'
import { AnimalCard } from '../../components/animalComponents/AnimalCard'

export const Favorites = ({ animals, loggedUser, toggleFavorite }) => {
  return (
    <div className='favorites-page'>
      <h1>My Favorites</h1>
      <div className="animals">
        {animals && animals.filter(animal => loggedUser.favorites.includes(animal._id))
        .map(animal => <AnimalCard animal={animal} key={animal._id} toggleFavorite={toggleFavorite} loggedUser={loggedUser} />)}
      </div>
    </div>
  )
}
