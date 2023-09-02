import React from 'react'
import { AnimalCard } from './animalComponents/AnimalCard'

export const Animals = () => {
  
  const animal = {
    imageUrl : "https://images.theconversation.com/files/290710/original/file-20190903-175663-lqb3z6.jpg?ixlib=rb-1.1.0&rect=48%2C0%2C5422%2C3603&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
    name : 'Sad monkey',
    type : 'Good one',
    age: 6
  }
  const animal2 = {
    imageUrl : "https://3989ac5bcbe1edfc864a-0a7f10f87519dba22d2dbc6233a731e5.ssl.cf2.rackcdn.com/animalmedical2022/animal-medical-2022/funfacts_cropped.jpg",
    name : 'Sad monkey',
    type : 'Good one',
    age: 6
  }

  return (
    <div className='animals'>
      <AnimalCard animal={animal} />
      <AnimalCard animal={animal2} />
      <AnimalCard animal={animal} />
      <AnimalCard animal={animal} />
    </div>
  )
}
