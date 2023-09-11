import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyBackendContext } from '../../App'

export const AdministrationPage = ({ loggedUser, loginStorageUser, types, setTypes, fetchTypes }) => {
  const backendUrl = useContext(MyBackendContext);
  const nav = useNavigate();

  const [deleteMessage, setDeleteMessage] = useState('');
  const [addMessage, setAddMessage] = useState('');
  const newTypeRef = useRef();

  async function checkLoggedInformation() {
    if (loggedUser) return;
    const user = await loginStorageUser();
    if (!user) nav('/');
  }

  async function removeType(typeId) {
    console.log('Type to remove', typeId);

    const options = {
      method: 'DELETE'
    }
    const res = await fetch(backendUrl + '/deleteType/' + typeId._id, options);
    const data = await res.json();

    if (data.error) {
      setDeleteMessage('Error. ' + data.error);
    }
    if (data.result) {
      console.log(data.result.name);
      setDeleteMessage('Type removed: ' + data.result.name);
      await fetchTypes();
    }
    console.log(data)
  }

  async function addType() {
    const newType = {
      name: newTypeRef.current.value,
    }

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newType)
    }

    const res = await fetch(backendUrl + '/addType/', options);
    const data = await res.json();

    if (data.error) {
      setAddMessage('Error: ' + data.error);
    }
    if (data.result) {
      setAddMessage('Message: ' + data.result.name + ' added!');
      await fetchTypes();
    }
  }

  useEffect(() => {
    setDeleteMessage();
    checkLoggedInformation();
    fetchTypes();
    document.title = 'Administration';
  }, [])

  return (
    <div className='administration'>
      <h1>Animal Types</h1>
      <div className="types">
        <div className="create-type">
          <h2>Create new type</h2>
          <div className="add-message">{addMessage}</div>
          <div className="create-type-form">
            <div className="form-control">
              <label htmlFor="new-type"> New type: </label>
              <input type="text" id='new-type' ref={newTypeRef} />
            </div>
            <button onClick={addType}>Add</button>
          </div>
        </div>
        <div className="current-types">
          <h2>Click on type to remove that</h2>
          <div className='deleted-message'>{deleteMessage}</div>
          {types.length > 0
            && <div className='types-list'>
              {
                types.map(type =>
                  <div className='type' key={type.id} onClick={() => removeType(type)}>
                    {type.name}
                  </div>
                )
              }
            </div>}
        </div>
      </div>
    </div>
  )
}
