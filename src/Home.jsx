import React from "react";
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import AddTodo from "./tareas/containers/AddTodo";
import VisibleTodoList from "./tareas/containers/VisibleTodoList";
import {useDispatch } from 'react-redux';
import Footer from "./tareas/Footer";



// Componente React Boton =  button stilizado con styled css 
export const Boton = styled.button`
  font-size: 1.4em;
  display: inline-block;
  background-color: #e10098;
  color: ${(props)=>props.color? props.color: '#fff'  }; 
`;
export const Boton2 = styled(Boton)`
  padding: 10px;
  background-color: #0ac1a8;  
` ;

const Container = styled.div`
  padding: 10px;
  background-color: #0ac1a8;
`;





let Home = () => {
    //console.log("<<<<<<HOME>>>>>>. Estado tareas:",store.getState().sliceTareas.tareas);
    let dispatcher = useDispatch();
    let navegar=useNavigate();


    return (
      <>
      <h1>HOME (Single Page Apps)</h1>
      <div id="home">
        <div id='div1'>
          <h2>Aplicacion Tiktok</h2>
          <p><Link to='/videos'>Link a /videos</Link></p>
          <p><Link to='/videos/nuevo'>Link a /videos/nuevo</Link></p>
          <p><Link to='/usuarios'>Link a /usuarios</Link></p>
          <p><Link to='/usuarios/login'>Link a /usuarios/login</Link></p>
          <p><Link to='/usuarios/miperfil'>Mi Perfil</Link></p>
          <Boton2 id='boton' color='#f9f929' onClick={ ()=>navegar('/usuarios/miperfil')}>Mi Perfil</Boton2>

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
  export default Home;


