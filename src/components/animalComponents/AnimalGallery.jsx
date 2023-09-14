import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { MyBackendContext } from '../../App'

export const AnimalGallery = ({ animal, photosArray }) => {

    const backendUrl = useContext(MyBackendContext);

    const currentAnimal = animal ? animal : {
        images: photosArray
    }

    const [imageIndex, setImageIndex] = useState(0);

    const changeState = (value) => {
        switch (value) {
            case 1: {
                if (imageIndex < currentAnimal.images.length - 1) {
                    setImageIndex(imageIndex + value);
                } else {
                    setImageIndex(0);
                }
                break;
            }
            case -1: {
                if (imageIndex > 0) {
                    setImageIndex(imageIndex + value);
                } else {
                    setImageIndex(currentAnimal.images.length - 1);
                }
                break;
            }
            default:
                console.log('bad argument passed');
        }
    };

    const imageWrapperRef = useRef();

    const image = () => {
        console.log(currentAnimal);
        if (currentAnimal && !currentAnimal.deleted) return (currentAnimal.images.length > 0 && currentAnimal?.images[0] !== '') ? currentAnimal.images[imageIndex] : backendUrl + "/images/no-image.jpg";
        if (currentAnimal.deleted) return backendUrl + "/images/deleted.jpg"
    }

    useEffect(() => {
        imageWrapperRef.current.style.backgroundImage = `url(${image()})`;
    }, [imageIndex, currentAnimal.images]
    );

    return (
        <div className='gallery'>
            {currentAnimal && <div className="image-wrapper" ref={imageWrapperRef} >
                {currentAnimal.images.length > 1 && <img
                    onClick={() => {
                        changeState(-1);
                    }}
                    src="https://cdn1.iconfinder.com/data/icons/freeline/32/Arrow-Left-256.png"
                    alt=""
                    className="left icon"
                />}
                {currentAnimal.images.length > 1 && <img
                    onClick={() => {
                        changeState(+1);
                    }}
                    src="https://cdn1.iconfinder.com/data/icons/freeline/32/Arrow-Right-256.png"
                    alt=""
                    className="right icon"
                />}
            </div>}
            <div className="small-pics">
                {currentAnimal?.images && currentAnimal.images.map((current, id) =>
                    <div key={id} className={`image-wrapper${id === imageIndex ? ' selected-icon' : ''}`}>
                        <img src={current}
                            alt={id}
                            onClick={() => { setImageIndex(id) }}></img>
                    </div>
                )}
            </div>
        </div>

    )
}
