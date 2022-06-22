import './css/App.css';
import { BrowserRouter, Routes, Route, Outlet, Link, useNavigate,  useParams, useLocation } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import  store  from './store/tareas';
import AddTodo from './tareas/containers/AddTodo';

import Footer from './tareas/Footer';
import TodoList from './tareas/TodoList';

let Home =()=>{
    return (
        <>
            <h1>Home con Routes de BrowserRouter (Single Page Apps)</h1>
            <div id="home">
                <h2>APLICACION DE TAREAS</h2>
                <AddTodo dispatch={ store.dispatch}  />
                <TodoList todos={store.getState().sliceTareas.tareas} />
            </div>
        </>
    )
}

let Home2 = () => {
  //console.log("Home(). Estado tareas:",store.getState().sliceTareas.tareas);

  return (
    <>
    <h1>Home con Routes de BrowserRouter (Single Page Apps)</h1>
    <div id="home">
        <h2>APLICACION DE TAREAS</h2>
        <AddTodo dispatch={ store.dispatch}  />
        <TodoList todos={store.getState().sliceTareas.tareas} />
        <Footer />
    </div>
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
            <Home />
      <BrowserRouter>
        <Provider store={store}>    
          <Routes>
               <Route path='/' element={<Home />}></Route>
               <Route path='*' element={<Error404 />} />
          </Routes>
   


        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
