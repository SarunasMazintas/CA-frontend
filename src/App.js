import { BrowserRouter, Route, Routes} from 'react-router-dom';
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

  useEffect(() => console.log(document.location.pathname))

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

    if (newFavorites.includes(animalId)){
      newFavorites = newFavorites.filter(animal => animal !== animalId)
    } else {
      newFavorites = [...newFavorites, animalId]
    }

    const user = {
      _id: loggedUser._id,
      favorites: JSON.stringify(newFavorites)
    }

    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }

    fetch(backendUrl + '/updateUser', options)
      .then(res => res.json())
      .then(data => {
        getLoggedUserFromDB();
        console.log('data', data);
      })
  }

  async function getAnimalsList(){
    const request = await fetch(backendUrl + '/getAnimalsList');
    const data = await request.json();

    if (data.animals){
      setAnimals(data.animals)
    }
    //.then(data => data.json())
    //.then(data => setAnimals(data.animals))
  }


  return (

    <div className="App">
      <MyBackendContext.Provider value={backendUrl}>
        <BrowserRouter>
          <Toolbar loggedUser={loggedUser} />
          <Routes>
            <Route path='/' element={<LoginPage setLoggedUser={setLoggedUser} />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/animals' element={<Animals toggleFavorite={toggleFavorite} loggedUser={loggedUser} getAnimalsList={getAnimalsList} animals={animals}/>}></Route>
            <Route path='/create-animal' element={<CreateAnimal />}></Route>
            <Route path='/Favorites' element={<Favorites animals={animals} loggedUser={loggedUser} toggleFavorite={toggleFavorite}/>}></Route>
            
            <Route path='/animal/:id' element={<Animal animals={animals} loggedUser={loggedUser} toggleFavorite={toggleFavorite}/>}></Route>

          </Routes>
        </BrowserRouter>
      </MyBackendContext.Provider>
    </div>
  );
}

export default App;
