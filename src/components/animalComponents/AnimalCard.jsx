import React from 'react'

export const AnimalCard = ({animal, toggleFavorite, loggedUser}) => {

    const image = () => {
        //console.log(animal);
        return animal.image !== ''? animal.image : "http://localhost:8001/images/no-image.jpg";
    }

    function toggleThisFavorite(){
        toggleFavorite(animal._id);
    }
    
    
    return (
        <div className='animal-card'>
            <div className="image-wrapper">
                <img src={image()} alt="" />
            </div>
            <div className="information-wrapper">
                <div className="name">Name: {animal.name}</div>
                <div className="type">Type: {animal.type}</div>
                <div className="age">Age: {animal.age}</div>
            </div>
            <button onClick={toggleThisFavorite}>{loggedUser?.favorites.includes(animal._id) ? 'Remove from Favorites': 'Add to Favorites'}</button>
        </div>
    )
}