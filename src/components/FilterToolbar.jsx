import React, { useEffect, useRef, useState } from 'react'
import MultiRangeSlider from "multi-range-slider-react";

export const FilterToolbar = ({ animals, setFilters}) => {

    const getMaxValue = () => {
        const animalAges = animals.map(animal => Number(animal.age));
        console.log(5);
        return Math.max(...animalAges);
    }

    const maxAge = getMaxValue();
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(maxAge);
    const [minValue2, setMinValue2] = useState(0);
    const [maxValue2, setMaxValue2] = useState(maxAge);

    const typeRef = useRef();

    function setDefaultValues() {
        setMaxValue(maxAge);
        setMaxValue2(maxAge);
        setMinValue(0);
        setMinValue2(0);
    }

    function filterTypeChanged(e){
        setFilters({type: e.target.value});
    }

    useEffect(() => {
        console.log('miau')
        setFilters({
            minAge: minValue2,
            maxAge: maxValue2,
            type: typeRef.current.value
        })
    }, [maxValue2, minValue2, typeRef.current])

    return (
        <div className='filter-toolbar'>
            <div className="form-control">
                <label htmlFor="type"> Show Only: </label>
                <select name="type" id="type" ref={typeRef} onChange={filterTypeChanged}>
                    <option value="">Show All</option>
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                </select>
            </div>
            <div className="form-control">
                <label htmlFor="age"> Age: </label>
            <span>{minValue}</span>
                <MultiRangeSlider
                style={{border: 'none', boxShadow: 'none', width: '150px'}}
                ruler = {false}
                label = {false}
                    minValue={minValue}
                    maxValue={maxValue}
                    maxValue2={maxValue2}
                    minValue2={minValue2}
                    min={0}
                    max={maxAge}
                    step={1}
                    onInput={(e) => {
                        setMinValue(e.minValue);
                        setMaxValue(e.maxValue);
                    }}
                    onChange={(e) => {
                        setMinValue2(e.minValue);
                        setMaxValue2(e.maxValue);
                        console.log('kakarieku');
                        //setgameStats({lives: -1, games: 2})
                    }}
                />
                <span>{maxValue}</span>
            </div>
            <button onClick={setDefaultValues}>Clear Filters</button>
        </div>
    )
}
