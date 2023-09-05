import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { MyBackendContext } from '../../App'

export const Comments = ({animal}) => {

  const backendUrl = useContext(MyBackendContext);
  const messageRef = useRef();
  const [comments, setComments] = useState([]);

  function send() {
    if (messageRef.current?.value !== '') {
      //sendMessage(userLoggedIn, user, messageRef.current.value);
      messageRef.current.value = '';
    }
  }

  async function getCommentsFromDB(){
    const request = await fetch(backendUrl + '/getCommentsByAnimalId/' + animal._id);
    const data = await request.json();
    setComments(data.comments);
    console.log(data.comments)
  }

  useEffect(() => {
    console.log('we brnn here');
    getCommentsFromDB()
  }, [])

  function keyClicked(e) {
    if (e.key === 'Enter') send();
  }

  return (
    <div className='messages-component'>
      <div>
        No conversations started yet.
        <div>
          Go to Other users page and start one!
        </div>
      </div>
      {comments && comments.map(comment => <div>{comment.message}</div>)}
      <div className="controls">
        <input type="text" ref={messageRef} onKeyDown={keyClicked} />
        <button onClick={send}>Send!</button>
      </div>
    </div>
  )
}
