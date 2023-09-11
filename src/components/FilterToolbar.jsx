import React, { useEffect, useRef, useState } from 'react'
import MultiRangeSlider from "multi-range-slider-react";

export const FilterToolbar = ({ animals, setFilters, getMaxValue, types }) => {

    const maxAge = getMaxValue();
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(maxAge);
    const [minValue2, setMinValue2] = useState(0);
    const [maxValue2, setMaxValue2] = useState(maxAge);

    const typeRef = useRef();
    const showOnlyWithPhotosRef = useRef();

    function setDefaultValues() {
        setMaxValue(maxAge);
        setMaxValue2(maxAge);
        setMinValue(0);
        setMinValue2(0);
        typeRef.current.value = '';
        showOnlyWithPhotosRef.current.checked = false;
        setFilters({
            type: '',
            showOnlyWithPhotos: false
        });
    }

    function filterTypeChanged(e) {
        setFilters({ type: e.target.value });
        console.log(e.target.value)
    }

    function onCheckboxChange(e) {
        console.log(e.target.checked);
        setFilters({ showOnlyWithPhotos: e.target.checked });
    }

    useEffect(() => {
        setFilters({
            minAge: minValue2,
            maxAge: Number.isFinite(maxValue2) ? maxValue2 : maxAge,
            type: typeRef.current.value
        })
    }, [maxValue2, minValue2, typeRef.current, animals])

    return (
        <div className='filter-toolbar'>
            <div className="filter-control">
                <label htmlFor="type"> Show Only: </label>
                <select name="type" id="type" ref={typeRef} onChange={filterTypeChanged}>
                    <option value="">Show All</option>
                    {types && types.map(type => 
                    <option value={type.name}>{type.name[0].toUpperCase()+type.name.slice(1)}</option>
                    )}
                </select>
            </div>
            <div className="filter-control">
                <input type="checkbox" name="withPhotosOnly" id="withPhotosOnly" onChange={onCheckboxChange} ref={showOnlyWithPhotosRef} />
                <label htmlFor="withPhotosOnly">With photos only</label>
            </div>
            <div className="filter-control">
                <label htmlFor="age"> Age: </label>
                <span>{minValue}</span>
                <MultiRangeSlider
                    style={{ border: 'none', boxShadow: 'none', width: '150px' }}
                    ruler={false}
                    label={false}
                    minValue={minValue}
                    maxValue={Number.isFinite(maxValue2) ? maxValue2 : maxAge}
                    maxValue2={maxValue2}
                    minValue2={Number.isFinite(maxValue2) ? maxValue2 : maxAge}
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
                    }}
                />
                <span>{maxValue}</span>
            </div>
            <button onClick={setDefaultValues}>Clear Filters</button>
        </div>
    )
}
