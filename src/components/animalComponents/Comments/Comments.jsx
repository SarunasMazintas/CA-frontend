import React, { useEffect, useState } from 'react'
import { Comment } from './Comment'
import { useContext } from 'react';
import { MyBackendContext } from '../../../App'

export const Comments = ({ comments, loggedUser }) => {
    const backendUrl = useContext(MyBackendContext);

    const [users, setUsers] = useState();

    async function getAllUsersFromDB() {
        const request = await fetch(backendUrl + '/getUsers');
        const data = await request.json();
        if (data.users){
            setUsers(data.users);
            console.log(data.users);
        }
    }

    useEffect(() => {
        getAllUsersFromDB();
    }, [])

    return (
        <div className='comments'>
            {comments && users && comments.map(comment => <Comment comment={comment} users={users} loggedUser={loggedUser}/>)}
        </div>
    )
}
