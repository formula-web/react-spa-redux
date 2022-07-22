import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter, Routes, Route, Outlet, Link, useNavigate,  useParams, useLocation, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import  store, { persistor }  from './store';
import SignIn from './usuarios/SignIn';
import Reloj from './Reloj'
import {logOut} from './store/usuario.js';  //redux reducer para hacer logout, definida en usuario.js
import Videos, { ComunVideos } from './videos/Videos';
//import Videos2 from './videos/Videos2';
import VideosForm from './videos/VideosForm';
import { PersistGate } from 'redux-persist/integration/react';
import { borrar1Video, clearVideos, loadVideos } from './store/videos';
import AddTodo from './tareas/containers/AddTodo';
import VisibleTodoList from './tareas/containers/VisibleTodoList';
import Footer from './tareas/Footer';
import TodoList from './tareas/TodoList';
import VideosContainer from './videos/containers/VideosContainer';
import VideoShow from './videos/VideoShow';
import Perfil from './usuarios/Perfil';
import Home from './Home';
import { ThemeProvider } from 'styled-components';
import tema, { EstilosGlobales } from './theme';
import LayoutApp from './theme/LayoutApp';
import UserFormLayout from './usuarios/UserFormLayout';
import SignUp from './usuarios/Signup';
import AppRoutes from './AppRoutes';



let NoImplementado = () => {
  return (<h2>Path-Elemento no implementado</h2>)
}
//Componente comun a todas las carpetas de /usuarios
let ComunUsuarios = () => {
  /* <Outlet /> representa el elemento de los route hijos */
  let Navegador = useNavigate();
  let dispatcher = useDispatch();
  let usuario = useSelector( (state)=>state.sliceUsuario.user  );
  console.log("ComunUsuarios  usuario:", usuario?usuario.email : "");
  let iraHome = () => { Navegador('/') }
  let botonLogout = ()=>{
      dispatcher ( logOut( ) ); // hacer logout con el redux reducer logOut
      Navegador('/');   // ir a home al hacer logout
   }
  return (
    <>
      <h2>CABECERA USUARIOS. {usuario ? usuario.email: ""}</h2>
      <button onClick={iraHome}>Home</button>
      {usuario && <button onClick={botonLogout}>Logout</button> }
      <Outlet />
    </>
  )

}

//Componente para /videos/nuevo
let VideosNuevo = () => {
  return (
    <>
      <h2>Videos Nuevo</h2>
      <Link to='/'>Home</Link>
      <VideosForm />
    </>
  )
}
//Componente para /videos/:id
let Videosid = () => {
  let { id } = useParams(); //valor del path (/videos/:id )
  //Recoger parametros del querystring
  let location = useLocation();
  let querystring = new URLSearchParams(location.search);
  let parametros = "";
  for (let x of querystring) {
    parametros += x[0] + "=" + x[1] + ", ";
    console.log("Parametro:", x[0]);
    console.log("Valor:", x[1]);
  }
  return (
    <>
      <h2>Video ID= {id}   Parametros: {parametros} </h2>
      <Link to='/'>Home</Link>
      <Outlet />
    </>
  )
}



function App() {
  //let usuario=useSelector(state=>state.sliceUsuario.user);
  return ( 
    <div className="App">
   
      <BrowserRouter>
        <Provider store={store}>    
        <PersistGate loading={null} persistor={ persistor }>   
          <ThemeProvider theme={tema}>
            <EstilosGlobales />
            <LayoutApp>
              <AppRoutes />
            </LayoutApp>
 
          </ThemeProvider>
        </PersistGate>


        </Provider>
        <header className="App-header">
          <h1>header</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
