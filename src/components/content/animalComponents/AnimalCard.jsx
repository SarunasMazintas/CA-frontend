import React from 'react'

export const AnimalCard = ({animal}) => {
    return (
        <div className='animal-card'>
            <div className="image-wrapper">
                <img src={animal.imageUrl} alt="" />
            </div>
            <div className="information-wrapper">
                <div className="name">Name: {animal.name}</div>
                <div className="type">Type: {animal.type}</div>
                <div className="age">Age: {animal.age}</div>
            </div>
        </div>
    )
}