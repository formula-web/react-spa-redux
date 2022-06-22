import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter, Routes, Route, Outlet, Link, useNavigate,  useParams, useLocation } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import  store, { persistor }  from './store';
import SignIn from './usuarios/SignIn';
import Reloj from './Reloj'
import {logOut} from './store/usuario.js';  //redux reducer para hacer logout, definida en usuario.js
import Videos from './videos/Videos';
//import Videos2 from './videos/Videos2';
import VideosForm from './videos/VideosForm';
import { PersistGate } from 'redux-persist/integration/react';
import { clearVideos, loadVideos } from './store/videos';
import AddTodo from './tareas/containers/AddTodo';
import VisibleTodoList from './tareas/containers/VisibleTodoList';
import Footer from './tareas/Footer';
import TodoList from './tareas/TodoList';

let Home = () => {
  console.log("<<<<<<HOME>>>>>>. Estado tareas:",store.getState().sliceTareas.tareas);
  let dispatcher = useDispatch();
  let onclick =()=>{
    console.log("Store:",store, "state:", store.getState(), "todos=",store.getState().sliceTareas.tareas); 
    store.dispatch( {type:'ADD_TODO', text:'pacop'} );
  }
  return (
    <>
    <h1>Home con Routes de BrowserRouter (Single Page Apps)</h1>
    <div id="home">
      <div id='div1'>
        <h2>Aplicacion Tiktok</h2>
        <p><Link to='/videos'>Link a /videos</Link></p>
        <p><Link to='/videos/nuevo'>Link a /videos/nuevo</Link></p>
        <p><Link to='/usuarios'>Link a /usuarios</Link></p>
        <p><Link to='/usuarios/login'>Link a /usuarios/login</Link></p>
        <button onClick={ onclick }>Dispath una Action</button>
      </div>
      <div id='div2'>
        <h2>APLICACION DE TAREAS</h2>
        <AddTodo  />
        <VisibleTodoList  />

        <Footer />
      </div>
    </div>
    </>
  )
}
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
//Componente comun a todas las carpetas de /videos
let ComunVideos = () => {
  let dispatcher = useDispatch();
  let Navegador = useNavigate();
  let iraHome = () => { Navegador('/') }
  let borrarVideos = ()=>{  store.dispatch ( clearVideos() ) }
  let cargarVideos = ()=>{  store.dispatch( loadVideos( {par1: "video1"}) ) }
  return (
    <>
      <h2>Elemento cabecera maste2 4.3 tris comun de /videos</h2>
      <Videos />

      <button onClick={iraHome}>Home</button>
      <button onClick={borrarVideos}>Borrar Videos</button>
      <button onClick={cargarVideos}>Cargar Videos</button>
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

//Componente para pagina error 404
let Error404 = () => {
  return (
    <>
      <h1>Pagina no existe</h1>
      <Link to='/'>Home</Link>
    </>
  )
}


function App() {

  return ( 
    <div className="App">
      <div className="reloj"><Reloj /></div>
      <BrowserRouter>
        <Provider store={store}>    
        <PersistGate loading={null} persistor={ persistor }>
          <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/usuarios' element={<ComunUsuarios />} >
                <Route path='' element={<NoImplementado />} />
                <Route path='registro' element={<NoImplementado />} />
                <Route path='login' element={<SignIn />} />
                <Route path=':id' element={<NoImplementado />} />
                <Route path=':id/videos' element={<NoImplementado />} />
              </Route>
              <Route path='/videos' element={<ComunVideos />} >
                <Route path='' element={<NoImplementado />} />
                <Route path='nuevo' element={<VideosNuevo />} />
                <Route path=':id' element={<Videosid />}></Route>
              </Route>
              <Route path='*' element={<Error404 />} />
          </Routes>
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
