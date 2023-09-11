import React, { useEffect, useState } from 'react'
import { CommentsWrapper } from '../../components/animalComponents/Comments/CommentsWrapper'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react';
import { MyBackendContext } from '../../App'
import { AnimalGallery } from '../../components/animalComponents/AnimalGallery';

export const Animal = ({ animals, loggedUser, loginStorageUser, getAnimalsList }) => {
    const backendUrl = useContext(MyBackendContext);
    const { id } = useParams();

    const [animal, setAnimal] = useState();

    const image = () => {
        return animal.image !== '' ? animal.image : backendUrl + "/images/no-image.jpg";
    }

    const nav = useNavigate();

    async function init() {
        setAnimal(prev => {
            const thisAnimal = animals.find(animal => animal._id === id);
            document.title = 'Animal: ' + thisAnimal.name;
            return thisAnimal;
        });
        if (loggedUser) return;

        console.log('Trying to log from local storage');
        const user = await loginStorageUser();
        if (!user) return nav('/');

        const animalsDB = await getAnimalsList();
        setAnimal(prev => {
            const thisAnimal = animalsDB.find(animal => animal._id === id);
            document.title = 'Animal: ' + thisAnimal.name;
            return thisAnimal;
        });
        
    }

    function editAnimal() {
        localStorage.setItem('animalToEdit', JSON.stringify(animal));
        console.log('Animal page, to LS: ', animal)
        nav('/edit-animal');
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
                    {loggedUser.isAdmin
                        ? <button className='edit-animal-button' onClick={editAnimal}>Edit animal information</button>
                        : <></>}
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
