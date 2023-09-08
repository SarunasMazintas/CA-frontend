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

const localStorageExpirationMinutes = 1000 * 60 * 100;

function getDateInHumanForm(timestamp) {
  const date2 = new Date(Number(timestamp));
  const year = date2.getFullYear()
  const month = String(date2.getMonth()).length < 2 ? '0' + (date2.getMonth() + 1) : date2.getMonth();
  const day = String(date2.getDate()).length < 2 ? '0' + date2.getDate() : date2.getDate();
  const hour = String(date2.getHours())
  const minutes = String(date2.getMinutes())
  const seconds = String(date2.getSeconds())
  return '' + year + '-' + month + '-' + day + ', ' + hour + ':' + minutes + ':' + seconds
}

function App() {



  const backendUrl = 'http://localhost:8001';
  const [loggedUser, setLoggedUser] = useState();
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    console.log(loggedUser)
  }, [loggedUser]);

  function validateStorageUser() {

    const currentTimestamp = new Date().getTime();

    const lsLoggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    if (!lsLoggedUser?.id) return;
    if (!lsLoggedUser.timestamp) return;

    if (Number(lsLoggedUser.timestamp) + localStorageExpirationMinutes < currentTimestamp) {
      console.log(`User timestamp: ${getDateInHumanForm(Number(lsLoggedUser.timestamp))}
        max allowed timestamp: ${getDateInHumanForm(Number(lsLoggedUser.timestamp) + localStorageExpirationMinutes)}
        current timestamp: ${getDateInHumanForm(currentTimestamp)}
        `)
      localStorage.removeItem('loggedUser')
      return;
    }
    return lsLoggedUser
  }

  async function loginStorageUser() {

    if (loggedUser) return;

    const lsLoggedUser = validateStorageUser();

    if (!lsLoggedUser) return;

    const user = await getUserFromDB(lsLoggedUser.id)

    //fetch data to components that need data ready;
    setLoggedUser(user)
    getAnimalsList();

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

  async function toggleFavorite(animalId) {

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

    const res = await fetch(backendUrl + '/updateUser/' + loggedUser._id, options)
    const data = await res.json();
    getLoggedUserFromDB();

    return data;
  }

  function logOut() {
    localStorage.removeItem('loggedUser')
  }



  async function getAnimalsList() {
    const request = await fetch(backendUrl + '/getAnimalsList');
    const data = await request.json();
    if (data.animals) {
      setAnimals(current => data.animals)
    }
    return data.animals;
  }


  return (

    <div className="App">
      <MyBackendContext.Provider value={backendUrl}>
        <BrowserRouter>
          <Toolbar loggedUser={loggedUser} logOut={logOut} />
          <div className="content">
            <Routes>
              <Route path='/' element={<LoginPage setLoggedUser={setLoggedUser} loginStorageUser={loginStorageUser} validateStorageUser={validateStorageUser} />}></Route>

              <Route path='/register' element={<RegisterPage />}></Route>

              <Route path='/animals' element={<Animals toggleFavorite={toggleFavorite} loggedUser={loggedUser} getAnimalsList={getAnimalsList} animals={animals} loginStorageUser={loginStorageUser} />}></Route>

              <Route path='/create-animal' element={<CreateAnimal loggedUser={loggedUser} loginStorageUser={loginStorageUser} />}></Route>

              <Route path='/favorites' element={<Favorites animals={animals} loggedUser={loggedUser} toggleFavorite={toggleFavorite} loginStorageUser={loginStorageUser} />}></Route>

              <Route path='/animal/:id' element={<Animal animals={animals} loggedUser={loggedUser} toggleFavorite={toggleFavorite} loginStorageUser={loginStorageUser} getAnimalsList={getAnimalsList} />}></Route>

            </Routes>
          </div>
        </BrowserRouter>
      </MyBackendContext.Provider>
    </div>
  );
}

export default App;
