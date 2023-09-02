import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginPage } from './components/login/LoginPage';
import { RegisterPage } from './components/login/RegisterPage';
import { Toolbar } from './components/Toolbar';
import { Animals } from './components/content/Animals';
import { CreateAnimal } from './components/content/animalComponents/CreateAnimal';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Toolbar />
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/animals' element={<Animals />}></Route>
        <Route path='/create-animal' element={<CreateAnimal />}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
