import React from 'react'
import { Link, useLocation } from "react-router-dom";


export const Toolbar = ({ loggedUser }) => {
    const location = useLocation();
    return (
        <div>
            {loggedUser && !(location.pathname === '/' || location.pathname === '/register') &&
                <div className='toolbar'>
                    <div className="greetings">Hello, {loggedUser.username}!</div>
                    <div className="options">
                        {!(location.pathname === '/animals') && <Link to='/animals'>Animals</Link>}
                        {!(location.pathname === '/create-animal') && <Link to='/create-animal'>Add animal</Link>}
                        {!(location.pathname === '/favorites') && <Link to='/favorites'>Favorites ({loggedUser?.favorites?.length})</Link>}
                    </div>
                    {!(location.pathname === '/') && <Link to='/'>Log out!</Link>}
                </div>
            }
        </div>
    )
}
