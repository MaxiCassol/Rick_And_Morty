import './App.css'
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav.jsx';
import About from './components/About/About.jsx';
import Detail from './components/Detail/Detail.jsx';
import Form from './components/Form/Form.jsx';
import Favorites from "./components/Favorites/Favorites.jsx";
// import allCharacters from "./components/allCharacters/allCharacters.jsx"
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Route, Routes } from 'react-router-dom';

function App () {
  //!hooks
  const [characters, setCharacters] = useState([]);
  const { pathname } = useLocation();
  const [access, setAccess] = useState(false); // ESTADO DE ACCESS
  const navigate = useNavigate();

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  //! cREDENCIALES FAKE
  // const username = 'a@a.com';
  // const password = '1a';
  
  //! event handlers
  const onSearch = (id) => {// agrega personajes al listado
    // const URL_BASE = "https://be-a-rym.up.railway.app/api";
    // const KEY = "b7da45408160.1c92e97ddeac70524dff";
    const URL_BASE = "http://localhost:3001"

    if(characters.find((char) => char.id === id)){
      return alert("Personaje repetido");
    }

    // fetch(`${URL_BASE}/character/${id}?key=${KEY}`)
    fetch(`${URL_BASE}/onsearch/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.name) { //find busca que la data entrante no este en la lista que se esta mostrando para evitar repetidos
          setCharacters((oldChars) => [...oldChars, data]);
          }else {
          alert('Algo salio mal');
        }
    });
  };
  
  // const allCharacters = () => {
  //   const URL_BASE = "http://localhost:3001/rickandmorty"

  //   fetch(`${URL_BASE}/allCharacters`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.name) { 
  //         setCharacters((oldChars) => [...oldChars, data]);
  //         }else {
  //         alert('Algo salio mal');
  //       }
  //   });

  // }

  const onClose = (id) => {//quita personajes del listado
    setCharacters(characters.filter((char) => char.id !== id));
  };
  
  function login(userData) {
    if (true
      // userData.password === password && userData.username === username
      ) {
      setAccess(true);//modifica el estado de login
      navigate("/home");
    }else{
      alert('credenciales incorrectas')}
  };

  useEffect(() => {
    !access && navigate("/")
  }, [navigate, access]);

  // function Logout = () => {

  // }

  //!render
  return (
    <div className='App' style={{ padding: '25px' }}>
      {pathname !== "/" && <Nav className='nav' onSearch={onSearch} />}
      <Routes>
        <Route 
          path="/" 
          element={<Form login={login} />} />        
        <Route 
          path="/home" 
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="/detail/:detailId" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App;
