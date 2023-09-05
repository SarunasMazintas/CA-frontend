import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { MyBackendContext } from '../../../App'
import { Comments } from './Comments';

export const CommentsWrapper = ({ animal, loggedUser }) => {

  const backendUrl = useContext(MyBackendContext);
  const messageRef = useRef();
  const [comments, setComments] = useState([]);

  async function send() {
    if (messageRef.current?.value !== '') {
      const comment = {
        author: loggedUser._id,
        animal: animal._id,
        message: messageRef.current.value
      }

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(comment)
      }
      
      const request = await fetch(backendUrl + '/createComment', options);
      const data = await request.json();
      console.log(data.result)
      messageRef.current.value = '';
      getCommentsFromDB();
    }
  }

  async function getCommentsFromDB() {
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
    <div className='comments-wrapper'>
      {!comments.length && <div className='no-comments'>
        No comments yet.
        <div>
          Be the first!
        </div>
      </div>}
      <Comments comments={comments} loggedUser={loggedUser}/>
      <div className="controls">
        <input type="text" ref={messageRef} onKeyDown={keyClicked} />
        <button onClick={send}>Send!</button>
      </div>
    </div>
  )
}
