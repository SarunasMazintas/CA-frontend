import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/login/RegisterPage';
import { Toolbar } from './components/Toolbar';
import { Animals } from './pages/AnimalPages/Animals';
import { CreateAnimal } from './pages/AnimalPages/CreateAnimal';
import { createContext, useEffect, useState } from 'react';
import { Favorites } from './pages/AnimalPages/Favorites';
import { Animal } from './pages/AnimalPages/Animal';
export const MyBackendContext = createContext()

function App() {



  const backendUrl = 'http://localhost:8001';
  //const [loggedUser, setLoggedUser] = useState({ _id: '64f21532ad9c24462c52f9af', username: '5', password: '$2b$10$enBX4lUmBffjjT7RpQcLk.XhIMmtlgQzppnodsoI8.m4w20AuhMhi', image: 'https://cdn-icons-png.flaticon.com/512/6386/6386976.png', __v: 1, favorites: ['ututu'] });
  const [loggedUser, setLoggedUser] = useState();
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    console.log(loggedUser)
  }, [loggedUser]);

  useEffect(() => {
    loginStorageUser();
  }, [])

  useEffect(() => {
    console.log('6' , animals);
  }, [animals])

  async function loginStorageUser() {
    if (loggedUser) return;
    const lsloggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    if (!lsloggedUser?.id) return;
    if (!lsloggedUser.timestamp) return;

    const user = await getUserFromDB(lsloggedUser.id)
    console.log(user);
    setLoggedUser(user)
    getAnimalsList();
    console.log(loggedUser)
    return user;
  }


  async function getUserFromDB(id) {

    const res = await fetch(backendUrl + '/getUser/' + id);
    const data = await res.json();
    if (data.error) {
      //console.log('Error 1');
      return data.error
    }
    //console.log(data.user)
    return data.user;


    // await fetch(backendUrl + '/getUser/' + id)
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.error) {
    //       console.log('Error 1');
    //       return data.error
    //     }
    //     console.log(data.user)
    //     return data.user;
    //   })
  }

  async function getLoggedUserFromDB() {
    const user = await getUserFromDB(loggedUser._id);
    if (user?._id) {
      console.log('Logged user: ', user)
      setLoggedUser(user);
    }
  }

  function toggleFavorite(animalId) {

    let newFavorites = loggedUser.favorites;

    if (newFavorites.includes(animalId)) {
      newFavorites = newFavorites.filter(animal => animal !== animalId)
    } else {
      newFavorites = [...newFavorites, animalId]
    }

    const user = {
      favorites: JSON.stringify(newFavorites)
    }

    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }

    fetch(backendUrl + '/updateUser/' + loggedUser._id, options)
      .then(res => res.json())
      .then(data => {
        getLoggedUserFromDB();
      })
  }



  async function getAnimalsList() {
    const request = await fetch(backendUrl + '/getAnimalsList');
    const data = await request.json();
    console.log('5', data)
    if (data.animals) {
      setAnimals(current => data.animals)
    }
    console.log('4', animals)
    return data.animals;
  }


  return (

    <div className="App">
      <MyBackendContext.Provider value={backendUrl}>
        <BrowserRouter>
          <Toolbar loggedUser={loggedUser} />
          <div className="content">
            <Routes>
              <Route path='/' element={<LoginPage setLoggedUser={setLoggedUser} />}></Route>

              <Route path='/register' element={<RegisterPage />}></Route>

              <Route path='/animals' element={<Animals toggleFavorite={toggleFavorite} loggedUser={loggedUser} getAnimalsList={getAnimalsList} animals={animals} loginStorageUser={loginStorageUser}/>}></Route>

              <Route path='/create-animal' element={<CreateAnimal loginStorageUser={loginStorageUser}/>}></Route>

              <Route path='/favorites' element={<Favorites animals={animals} loggedUser={loggedUser} toggleFavorite={toggleFavorite} loginStorageUser={loginStorageUser}/>}></Route>

              <Route path='/animal/:id' element={<Animal animals={animals} loggedUser={loggedUser} toggleFavorite={toggleFavorite} loginStorageUser={loginStorageUser} getAnimalsList={getAnimalsList}/>}></Route>

            </Routes>
          </div>
        </BrowserRouter>
      </MyBackendContext.Provider>
    </div>
  );
}

export default App;
