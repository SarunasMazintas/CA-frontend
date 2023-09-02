import React from 'react'
import { Link } from "react-router-dom";


export const Toolbar = () => {
    return (
        <div className='toolbar'>
            <Link to='/animals'>Animals</Link>
            <Link to='/create-animal'>Add animal</Link>
            <Link to='/register'>Favorite animals</Link>
        </div>
    )
}
