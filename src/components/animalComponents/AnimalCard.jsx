import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

export const AnimalCard = ({ animal, animalId, animals, toggleFavorite, loggedUser, removeAnimal }) => {


    let currentAnimal;
    const buttonFavRef = useRef();
    const removeButton = useRef();

    if (animal) {
        currentAnimal = animal;
    } else {
        const animalFound = animals.find(current => current._id === animalId);
        if (animalFound) {
            currentAnimal = animalFound;
        } else {
            currentAnimal = {
                _id: animalId,
                deleted: true
            }
        }
    }

    const nav = useNavigate();

    const image = () => {
        console.log(currentAnimal);
        if (currentAnimal && !currentAnimal.deleted) return (currentAnimal.images.length > 0 && currentAnimal?.images[0] !== '') ? currentAnimal.images[0] : "http://localhost:8001/images/no-image.jpg";
        if (currentAnimal.deleted) return "http://localhost:8001/images/deleted.jpg"
    }

    async function toggleThisFavorite() {
        buttonFavRef.current.disabled = true;
        const result = await toggleFavorite(currentAnimal._id);
        console.log(result);
        buttonFavRef.current.disabled = false;
    }

    function navToAnimal() {
        if (!currentAnimal.deleted) {
            nav('/animal/' + currentAnimal._id);
        }
    }

    async function removeThisAnimal() {
        removeButton.current.disabled = true;
        const result = await removeAnimal(currentAnimal._id)
        removeButton.current.disabled = false;
    }



    return (
        <div>
            {animals?.length > 0 && <div className='animal-card'>
                <div className="image-wrapper" onClick={navToAnimal} style={{ cursor: 'pointer' }}>
                    <img src={image()} alt="" />
                </div>
                {!currentAnimal.deleted && <div className="information-wrapper">
                    <div className="name">Name: {currentAnimal?.name}</div>
                    <div className="type">Type: {currentAnimal?.type}</div>
                    <div className="age">Age: {currentAnimal?.age}</div>
                </div>}
                {currentAnimal.deleted && <div className='deleted-message'>Animal is no longer available</div>}
                <button id='remove-from-favorite-button' ref={buttonFavRef} onClick={toggleThisFavorite}>{loggedUser?.favorites.includes(currentAnimal._id) ? 'Remove from Favorites' : 'Add to Favorites'}</button>
                {loggedUser?.isAdmin && removeAnimal && <button id='remove-button' ref={removeButton} onClick={removeThisAnimal}>Remove</button>}
            </div>}
        </div>
    )
}