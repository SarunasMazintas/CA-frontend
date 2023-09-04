import React, { useEffect, useState } from 'react'
import { Comments } from '../../components/animalComponents/Comments'
import { useParams } from 'react-router-dom'

export const Animal = ({ animals, loggedUser, toggleFavorite }) => {
    const {id} = useParams();

    const [animal, setAnimal] = useState();

    const image = () => {
        return animal.image !== '' ? animal.image : "http://localhost:8001/images/no-image.jpg";
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
                    <Comments />
                </div>
            </div>
            }
        </div>
    )
}
