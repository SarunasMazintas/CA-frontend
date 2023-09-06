import React from 'react'

export const Comment = ({comment, users, loggedUser}) => {
  
  function getUsername(){
    const user = users.find(current => current._id === comment.author);    
    return user._id === loggedUser._id ? 'Me' : user.username;
  }

  return (
    <div className='comment'>
        <span className='username'>{getUsername()}</span>
        <span className='separator'>: </span>
        <span className='message'>{comment.message}</span>
    </div>
  )
}
