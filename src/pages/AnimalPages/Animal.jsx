import React, { useEffect, useState } from 'react'
import { CommentsWrapper } from '../../components/animalComponents/Comments/CommentsWrapper'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { MyBackendContext } from '../../App'

export const Animal = ({ animals, loggedUser, toggleFavorite }) => {
    const backendUrl = useContext(MyBackendContext);
    const {id} = useParams();

    const [animal, setAnimal] = useState();

    const image = () => {
        return animal.image !== '' ? animal.image : backendUrl+"/images/no-image.jpg";
    }

    useEffect(() => {
        console.log(id);
        console.log(animals)
        setAnimal(animals.find(animal => animal._id === id));
    }, []);
    

    return (
        <div>
            {animal && <div className="animal">
                <div className="image-wrapper">
                    <img src={image()} alt="" />
                </div>
                <div className="information-wrapper">
                    <div className="name">Name: {animal.name}</div>
                    <div className="type">Type: {animal.type}</div>
                    <div className="age">Age: {animal.age}</div>
                </div>
                <div className="comments">
                    <CommentsWrapper animal={animal} loggedUser={loggedUser}/>
                </div>
            </div>
            }
        </div>
    )
}
