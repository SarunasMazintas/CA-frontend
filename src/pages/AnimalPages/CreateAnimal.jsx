import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { MyBackendContext } from '../../App'
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimalGallery } from '../../components/animalComponents/AnimalGallery';

export const CreateAnimal = ({ loggedUser, loginStorageUser, getAnimalsList, types }) => {

    const location = useLocation();

    const animalFromLS = JSON.parse(localStorage.getItem('animalToEdit'));
    const onEdit = location.pathname.includes('edit-animal');
    console.log('Create animal page, got from LS: ', animalFromLS);
    const backendUrl = useContext(MyBackendContext);
    const [message, setMessage] = useState();
    const [animalPhotos, setAnimalPhotos] = useState(onEdit ? animalFromLS.images : []);
    const [errors, setErrors] = useState([]);

    const nameRef = useRef();
    const ageRef = useRef();
    const imageRef = useRef();
    const typeRef = useRef();
    const formRef = useRef();

    const nav = useNavigate();

    function isFormValid() {
        let noErrors = true;
        setErrors((e) => []);
        nameRef.current.style.borderColor = null;
        nameRef.current.style.backgroundColor = null;

        ageRef.current.style.borderColor = null;
        ageRef.current.style.backgroundColor = null;

        if (nameRef.current.value.length < 1 || nameRef.current.value.length > 100) {
            setErrors((currentValue) => [...currentValue, 'Animal name length must be in range of 1..100!'])
            nameRef.current.style.borderColor = "red";
            nameRef.current.style.backgroundColor = "rgb(231, 185, 185, 0.2)";
            noErrors = false;
        }

        if (ageRef.current.value === '') {
            setErrors((currentValue) => [...currentValue, 'Age must be specified'])
            ageRef.current.style.borderColor = "red";
            ageRef.current.style.backgroundColor = "rgb(231, 185, 185, 0.2)";
            noErrors = false;
        }

        return noErrors;
    }

    async function createAnimal() {
        if (!isFormValid()) return;
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
        const res = await fetch(backendUrl + '/addAnimal', options)
        const data = await res.json();
        if (data.animal) {
            console.log(data.animal)
            setMessage('Animal created!');
            await getAnimalsList();
            nav('/animal/' + data.animal._id);
        } else {
            setMessage(JSON.stringify(data.error));
        }
    }

    async function updateAnimal() {
        const animal = {
            name: nameRef.current.value,
            age: ageRef.current.value,
            images: animalPhotos,
            type: typeRef.current.value,
        }

        const options = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(animal)
        }

        const res = await fetch(backendUrl + '/updateAnimal/' + animalFromLS._id, options);
        const data = await res.json();
        console.log('update animal: ', data)
        if (data.animal) {
            setMessage('Animal updated!');
        }
        if (data.error) {
            setMessage(JSON.stringify(data.error));
        }
        localStorage.removeItem('animalToEdit');
        await getAnimalsList();
        nav('/animal/' + animalFromLS._id);

    }

    async function submit() {
        setMessage();

        if (onEdit) {
            await updateAnimal();
        } else {
            await createAnimal();
        }
    }

    async function checkLoggedInformation() {
        if (loggedUser) return;
        console.log('Trying to log from local storage');
        const user = await loginStorageUser();
        if (!user) nav('/');
    }

    useEffect(() => {
        if (onEdit) {
            nameRef.current.value = animalFromLS.name;
            ageRef.current.value = animalFromLS.age;
            typeRef.current.value = animalFromLS.type;
            document.title = 'Update animal: ' + animalFromLS.name
        } else {
            document.title = 'Add animal';
        }

        checkLoggedInformation();
    }, []);

    function addImageToArray(e) {
        e.preventDefault();
        const value = e.target.image.value;
        setAnimalPhotos(prev => [...prev, value]);
        formRef.current.reset();
    }

    function removePhotoFromArray(url) {
        setAnimalPhotos(prev => prev.filter(x => x !== url));
    }

    return (
        <div className='animal-creation'>
            <div className="information">
                <div className="initial-form-controls">
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
                            {types && types.map(type =>
                                <option key={type._id} value={type.name}>{type.name[0].toUpperCase() + type.name.slice(1)}</option>
                            )}
                        </select>
                    </div>
                    <div className="errors">
                        {errors && errors.map((x, id) => <div key={id}>{x}</div>)}
                    </div>
                </div>
                <div className="images">
                    <form ref={formRef} onSubmit={addImageToArray}>
                        <div className="form-control">
                            <label htmlFor="image"> Image Url: </label>
                            <input type="text" id='image' ref={imageRef} />
                        </div>
                        <input type="submit" id="submit" value={"Add image"} />
                    </form>
                </div>
                <div className="new-photos">
                    {animalPhotos.length > 0 && animalPhotos.map((current, id) => {
                        return <div key={id} onClick={() => removePhotoFromArray(current)} className='photo-url'>
                            <span className='delete-new-photo'>Delete {id}:</span>
                            <span>{current.slice(0, 15)}...{current.slice(-15)}</span>
                        </div>
                    })}
                </div>
                <button onClick={submit}>{onEdit ? 'Submit changes' : 'Add animal'}!</button>
                {message && <div className="error-message">{message}</div>}
            </div>
            <div className="gallery">
                {<AnimalGallery photosArray={animalPhotos} />}
            </div>

        </div>
    )
}
