import React, { useEffect, useState } from 'react'
import { CommentsWrapper } from '../../components/animalComponents/Comments/CommentsWrapper'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react';
import { MyBackendContext } from '../../App'
import { AnimalGallery } from '../../components/animalComponents/AnimalGallery';

export const Animal = ({ animals, loggedUser, toggleFavorite, loginStorageUser, getAnimalsList }) => {
    const backendUrl = useContext(MyBackendContext);
    const { id } = useParams();

    const [animal, setAnimal] = useState();

    const image = () => {
        return animal.image !== '' ? animal.image : backendUrl + "/images/no-image.jpg";
    }

    const nav = useNavigate();

    async function init() {
        setAnimal(animals.find(animal => animal._id === id));
        if (loggedUser) return;

        console.log('Trying to log from local storage');
        const user = await loginStorageUser();
        if (!user) return nav('/');

        const animalsDB = await getAnimalsList();
        setAnimal(animalsDB.find(animal => animal._id === id));

    }

    useEffect(() => {
        init();
    }, []);


    return (
        <div>
            {animal && <div className="animal">
                {/* <div className="image-wrapper">
                    <img src={image()} alt="" />
                </div> */}
                <div className="gallery image-wrapper">
                    <AnimalGallery animal={animal} />
                </div>
                <div className="information-wrapper">
                    <div className="name">Name: {animal.name}</div>
                    <div className="type">Type: {animal.type}</div>
                    <div className="age">Age: {animal.age}</div>
                </div>
                <div className="comments">
                    <div>Comments:</div>
                    <CommentsWrapper animal={animal} loggedUser={loggedUser} />
                </div>

            </div>
            }
            {/* <div className="gallery">
                <AnimalGallery animal={animal} />
            </div> */}
        </div>
    )
}
