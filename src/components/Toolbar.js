import React from 'react'
import { Link, useLocation } from "react-router-dom";


export const Toolbar = ({loggedUser}) => {
    const location = useLocation();
    return (
        <div className='toolbar'>
            {!(location.pathname === '/' || location.pathname === '/register') && <Link to='/animals'>Animals</Link>}
            {!(location.pathname === '/' || location.pathname === '/register') && <Link to='/create-animal'>Add animal</Link>}
            {!(location.pathname === '/' || location.pathname === '/register') && <Link to='/favorites'>Favorite animals ({loggedUser?.favorites?.length})</Link>}
            {!(location.pathname === '/' || location.pathname === '/register') && <Link to='/'>Log out!</Link>}
        </div>
    )
}
