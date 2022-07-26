import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Videos, { ComunVideos } from './videos/Videos';
import Perfil from "./usuarios/Perfil";
import SignIn from "./usuarios/SignIn";
import SignUp from "./usuarios/Signup";
import VideosForm from "./videos/VideosForm";
import VideoShow from "./videos/VideoShow";


//Componente para pagina error 404
let Error404 = () => {
    return (
      <>
        <h1>Pagina no existe</h1>
        <Link to='/'>Home</Link>
      </>
    )
  }

function AppRoutes() {
    return (
        <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="" element={<Outlet/> }> 
          <Route path='/usuarios' element={<><p>comun usuarios</p><Outlet/></>} >
            <Route path='' element={<p>Home usuarios</p>} />
            <Route path='registro' element={<SignUp />} />
            <Route path='login' element={<SignIn />} />
            <Route path='miperfil' element={<Perfil />} />
            <Route path=':id/videos' element={<p>:id/videos (no implementado)</p>} />
          </Route>
          <Route path='/videos' element={<><ComunVideos /><Outlet/></>} >
            <Route path='' element={<><Videos /></>} />
            <Route path='nuevo' element={<VideosForm />} />
            <Route path=':id' element={<VideoShow  />}></Route>
          </Route>
        </Route>   

        <Route path='*' element={<Error404 />} />
      </Routes>
    )
}

export default AppRoutes;

