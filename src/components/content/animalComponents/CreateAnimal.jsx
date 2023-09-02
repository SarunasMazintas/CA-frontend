import React, { useRef } from 'react'

export const CreateAnimal = () => {

    const nameRef = useRef();
    const ageRef = useRef();
    const imageRef = useRef();

    return (
        <div>
            <div className="form-control">
                <label htmlFor="name"> Name: </label>
                <input type="text" id='name' ref={nameRef} />
            </div>
            <div className="form-control">
                <label htmlFor="age"> Age: </label>
                <input type="text" id='age' ref={ageRef} />
            </div>
            <div className="form-control">
                <label htmlFor="image"> Image: </label>
                <input type="text" id='image' ref={imageRef} />
            </div>
            <div className="form-control">
                <label htmlFor="type"> Type: </label>
                <select name="type" id="type">
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                </select>
            </div>

        </div>
    )
}
