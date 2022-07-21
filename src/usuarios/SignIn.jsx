//Componente REACT SignIn. Visualizado en la ruta /usuarios/login
//Contiene controles de signIn (login), signUp (registro) y logOut .
//Invoca al estado Redux, slice "usuario", Actions Type (="reducers"):  'signIn', 'signUp', 'logOut' 

import React, { startTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import {useForm} from 'react-hook-form';

import {logOut, signIn, signUp} from '../store/usuario.js';    // Action para login de usuario definida en store/index.js
import sliceVideos, {clearVideos} from '../store/videos.js';
import store from '../store';
import UserFormLayout from './UserFormLayout.jsx';
import AppInput from '../elementos/AppInputs.jsx';

//Componente SignIn renderiza un boton de Login / Logout segun el estado del usuario
// para login hara dispatch a la accion signIn
// para logut hara dispatch a la accion singOut
// consulta el usuario consultando su estado con useSelector ( )
let SignIn = ( props) =>{
    let dispatcher = useDispatch();
    let usuario = useSelector( (state)=>state.sliceUsuario.user  );
    let estado  = useSelector( (state)=>state.sliceUsuario);
    console.log("Render Componente SignIn.usuario :", usuario);
    console.log("Estado:", estado.status);


    let HacerLogin = ( credenciales=>{
        dispatcher ( signIn( {credenciales:credenciales} ) )  // dispather ( accion ) esquema para invocar a la accion signIn del userSlice del Store
        //dispatcher({type:'usuario/signIn',credenciales:credenciales});  -->así no funciona por ser un reducer asíncrono 
    })
    

    let botonLogin = (ev)=>{
        ev.preventDefault();
    
        console.log("miSubmit()",ev.target);
        let credenciales = 
        { email: document.getElementsByName('email')[0].value, 
          password:document.getElementsByName('password')[0].value
        }
        console.log("Llamada a HacerLogin con Credenciales:", credenciales);
        HacerLogin(credenciales);
    }
    let botonLogOut = (ev)=>{
        ev.preventDefault();
        HacerLogOut();
    }


    let HacerLogOut = ()=>{
        console.log("hacerLogOut().. llama a dispatcher(logOut) ");
        dispatcher ( {type:logOut ,estado:'Logoff'} ) // dispather(action) invocar al reducer 'logOut' del userSlice cuyo name = 'usuario'
        dispatcher(  {type: clearVideos }  );
        dispatcher(  {type:'videos/cambiaEstado', estado:'estado cambiado'});
    }
    

    let hacerSignUp = (ev)=>{
        ev.preventDefault();
        let credenciales = 
        { email: document.getElementsByName('email')[0].value, 
          password:document.getElementsByName('password')[0].value,
          username: 'Otropaco'
        }
        dispatcher ( signUp( {credenciales: credenciales} ) );
        //dispatcher( {type:'usuario/signUp', payload:credenciales });
    }

    //const { register, handleSubmit } = useForm();


    return (
        <UserFormLayout>
            <form onSubmit={  botonLogin }>
                <AppInput type='email' name='email'   label='Tu email' />
                <AppInput type='password' name='password' label='Contraseña'  ></AppInput>
                <AppInput type='submit' value='Login (submit)' />

                { usuario 
                ? <button onClick={ botonLogOut }>LogOut </button>
                : <button onClick={ botonLogin }>Login  </button>
            }

                <button onClick = { hacerSignUp }>Sign Up</button> 
            </form>
        </UserFormLayout>
    )
}



let MostrarUsuario=( props )=>{
    return (<>Usuario: {props.usuario?props.usuario: "."}</>)
}

export default SignIn;
 