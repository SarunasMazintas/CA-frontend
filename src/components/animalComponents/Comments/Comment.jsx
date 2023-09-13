import React from 'react'

export const Comment = ({comment, users, loggedUser}) => {
  
  function getName(){
    const user = users.find(current => current._id === comment.author);    
    return user._id === loggedUser._id ? 'Me' : user.name;
  }

  return (
    <div className='comment'>
        <span className='username'>{getName()}</span>
        <span className='separator'>: </span>
        <span className='message'>{comment.message}</span>
    </div>
  )
}
