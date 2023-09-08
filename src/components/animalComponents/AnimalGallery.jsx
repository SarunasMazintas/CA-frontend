import React, { useEffect, useRef, useState } from 'react'


export const AnimalGallery = ({ animal, photosArray }) => {

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

    useEffect(() => {
        imageWrapperRef.current.style.backgroundImage = `url(${currentAnimal.images[imageIndex]})`;
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
                    <img src={current} key={id} alt={id} style={{opacity: `${id===imageIndex?0.5:1}`}} onClick={() => {setImageIndex(id)}}></img>
                )}
            </div>
        </div>
    
    )
}
