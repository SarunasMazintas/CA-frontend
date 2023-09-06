import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { MyBackendContext } from '../../App'

export const CreateAnimal = ({loginStorageUser}) => {
    const backendUrl = useContext(MyBackendContext);
    const [message, setMessage] = useState();

    const nameRef = useRef();
    const ageRef = useRef();
    const imageRef = useRef();
    const typeRef = useRef();

    function submit() {
        setMessage();
        console.log(typeRef.current)

        const animal = {
            name: nameRef.current.value,
            age: ageRef.current.value,
            image: imageRef.current.value,
            type: typeRef.current.value,
        }

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(animal)
        }

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

    useEffect(() => {
        loginStorageUser();
    }, []);

    return (
        <div className='animal-creation'>
            <div className="form-control">
                <label htmlFor="name"> Name: </label>
                <input type="text" id='name' ref={nameRef} />
            </div>
            <div className="form-control">
                <label htmlFor="age"> Age: </label>
                <input type="number" id='age' ref={ageRef} />
            </div>
            <div className="form-control">
                <label htmlFor="image"> Image: </label>
                <input type="text" id='image' ref={imageRef} />
            </div>
            <div className="form-control">
                <label htmlFor="type"> Type: </label>
                <select name="type" id="type" ref={typeRef}>
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                </select>
            </div>
            <button onClick={submit}>Add animal!</button>
            {message && <div className="error-message">{message}</div>}

        </div>
    )
}
