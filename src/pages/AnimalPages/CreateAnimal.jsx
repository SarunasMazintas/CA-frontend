import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { MyBackendContext } from '../../App'
import { useNavigate } from 'react-router-dom';
import { AnimalGallery } from '../../components/animalComponents/AnimalGallery';

export const CreateAnimal = ({ loggedUser, loginStorageUser }) => {
    const backendUrl = useContext(MyBackendContext);
    const [message, setMessage] = useState();
    const [animalPhotos, setAnimalPhotos] = useState([]);

    const nameRef = useRef();
    const ageRef = useRef();
    const imageRef = useRef();
    const typeRef = useRef();
    const formRef = useRef();

    function submit() {
        setMessage();

        const animal = {
            name: nameRef.current.value,
            age: ageRef.current.value,
            images: animalPhotos,
            type: typeRef.current.value,
        }

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(animal)
        }
        console.log(JSON.stringify(animal))
        fetch(backendUrl + '/addAnimal', options)
            .then(res => res.json())
            .then(data => {
                if (data.animal) {
                    setMessage('Animal created!');
                } else {
                    setMessage(JSON.stringify(data.error));
                }
            })

    }
    const nav = useNavigate();

    async function checkLoggedInformation() {
        if (loggedUser) return;
        console.log('Trying to log from local storage');
        const user = await loginStorageUser();
        if (!user) nav('/');
    }

    useEffect(() => {
        checkLoggedInformation();
    }, []);

    function addImageToArray(e) {
        e.preventDefault();
        const value = e.target.image.value;
        setAnimalPhotos(prev => [...prev, value]);
        formRef.current.reset();
    }

    function removePhotoFromArray(url){
        setAnimalPhotos(prev => prev.filter(x => x !== url));
    }

    return (
        <div className='animal-creation'>
            <div className="information">
                <div className="form-control">
                    <label htmlFor="name"> Name: </label>
                    <input type="text" id='name' ref={nameRef} />
                </div>
                <div className="form-control">
                    <label htmlFor="age"> Age: </label>
                    <input type="number" id='age' ref={ageRef} />
                </div>
                <div className="form-control">
                    <label htmlFor="type"> Type: </label>
                    <select name="type" id="type" ref={typeRef}>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                    </select>
                </div>
                <div className="images">
                    <br />
                    <form ref={formRef} onSubmit={addImageToArray}>
                        <div className="form-control">
                            <label htmlFor="image"> Image Url: </label>
                            <input type="text" id='image' ref={imageRef} />
                        </div>
                        <input type="submit" value="Add image" />
                    </form>
                    <br />
                </div>
                <div className="new-photos">
                    {animalPhotos.length > 0 && animalPhotos.map((current, id) => {
                        return <div key={id} onClick={() => removePhotoFromArray(current)} className='photo-url'>
                            <span className='delete-new-photo'>Delete {id}:</span>
                            <span>{current.slice(0, 15)}...{current.slice(-15)}</span>
                        </div>
                    })}
                </div>
                <br />
                <button onClick={submit}>Add animal!</button>
                {message && <div className="error-message">{message}</div>}
            </div>
            <div className="gallery">
                {<AnimalGallery photosArray={animalPhotos} />}
            </div>

        </div>
    )
}
