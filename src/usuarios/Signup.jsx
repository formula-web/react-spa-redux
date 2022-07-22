//Componente REACT SignUp. Visualizado en la ruta /usuarios/registro
//Contiene formulario signUp (registro) 
//Invoca al estado Redux, slice "usuario", Actions Type (="reducers"):   'signUp' 

import React, { startTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import {useForm} from 'react-hook-form';

import {signUp} from '../store/usuario.js';    // Action para login de usuario definida en store/index.js
import UserFormLayout from './UserFormLayout.jsx';
import AppInput from '../elementos/AppInputs.jsx';
import { Navigate, useNavigate } from 'react-router-dom';

//Componente SignIn renderiza un boton de Login / Logout segun el estado del usuario
// para login hara dispatch a la accion signIn
// para logut hara dispatch a la accion singOut
// consulta el usuario consultando su estado con useSelector ( )
let SignUp = ( props) =>{
    let dispatcher = useDispatch();
    let usuario = useSelector( (state)=>state.sliceUsuario.user  );
    let estado  = useSelector( (state)=>state.sliceUsuario);
    console.log("Render Componente SignUp.usuario :", usuario);
    console.log("Estado:", estado.status);
    let navegar = useNavigate();

    let hacerSignUp = async (ev)=>{
        ev.preventDefault();
        let credenciales = 
        { email: document.getElementsByName('email')[0].value, 
          password:document.getElementsByName('password')[0].value,
          username: document.getElementsByName('username')[0].value
        }
        await dispatcher ( signUp( {credenciales: credenciales} ) );
        //dispatcher( {type:'usuario/signUp', payload:credenciales });
        navegar("/videos");
    }

    //const { register, handleSubmit } = useForm();


    return (
        <UserFormLayout>
            <form onSubmit={  hacerSignUp }>
                <AppInput type='email' name='email'   label='Tu email' />
                <AppInput type='password' name='password' label='Contraseña'  ></AppInput>
                <AppInput type='text' name='username' label='Nombre de Usuario'  ></AppInput>
                <AppInput type='submit' value='Crear cuenta' />
            </form>
        </UserFormLayout>
    )
}


export default SignUp;
 