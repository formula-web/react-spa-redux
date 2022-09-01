//usuario.js 
// Estado de usuario Redux. Definir y Exportar state de usuarios (Slice) y sus Reducers:
//  Slice name:  'usuario' 
//  Reducers / acciones de 'usuario':  signIn, logOut, signUp
//  Exports: 
//           Slice 'usuario':     userSlice.reducer      
//           Reducers en userlice.reducer:  logOut,  signUp (asincrono), signIn (asincrono)

import {   createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import config from '../config/config.js';
import Axios from 'axios';

//console.log( "Config.servicioVideoapi:", `${config.servicioVideoapi}/users` );

// *** definir reducer:  SIGNUP ****
// Definir y exportar Reducer/action 'signUp' que se resuelve en modo asíncrono. 
// createAsyncThunk retorna una promise que deja el resultado en action.payload
export const signUp = createAsyncThunk ('usuario/signUp', async ({credenciales})=>{
    // SignUp asincrono
    let respuesta=await Axios.post(`${config.servicioVideoapi}/users`,{user: credenciales});
    console.log("Respuesta servicio web"+`Config.servicioVideoapi/users`, respuesta.data);
    return respuesta.data;
})

let signUpReducer1=(state, action) => {
    console.log("Dentro de signUpReducer1");
    let newState = {};
    newState.status = 'SignUp pending...';
    newState.user = null;
    return newState;
}

let signUpReducer2=(state, action) => {
    console.log("Dentro de signUpReducer2");
    let newState = {};
    newState.status = 'SignUp OK';
    newState.user = action.payload;
    return newState;
}
let signUpReducer3=(state, action) => {
    console.log("Dentro de signUpReducer3");
    let newState = {};
    newState.status = 'SignUp Failed';
    newState.user = null;
    return newState;
}



//---------------------------------------------------------------------------------------------

// ***definir reducer (asincrono):  SIGNIN (signIn) ****
// Definir y exportar Reducer/action 'signiN' que se resuelve en modo asíncrono. 
// createAsyncThunk retorna una promise que deja el resultado en action.payload
export const signIn = createAsyncThunk ('usuario/signIn', async ({credenciales})=>{
    // SignIn asincrono
    console.log("Dentro de signIn Action. Credenciales:", credenciales);
    let respuesta=await Axios.post(`${config.servicioVideoapi}/users/signIn`,{user: credenciales});
    console.log("Respuesta servicio web"+`Config.servicioVideoapi/users/singIn en .data.user`, respuesta.data.user );
    return respuesta ? respuesta.data.user : null;
})

let signInReducer1=(state, action) => {
    console.log("Dentro de signInReducer1");
    let newState = {};
    newState.status = 'Login pending...';
    newState.user = null;
    return newState;
}
let signInReducer2=(state, action) => {
    console.log("Dentro de signInReducer2");
    let newState = {};
    newState.status = 'Login OK';
    newState.user = action.payload;
    return newState;
}
let signInReducer3=(state, action) => {
    console.log("Dentro de signInReducer3");
    let newState = {};
    newState.status = 'Login Failed';
    newState.user = null;
    return newState;
}
//---------------------------------------------------------------------------------------------
// definir reducer LOGOUT (logOut )
// Reducer "simple", funcion síncrona
let logOutReducer =(estado,action)=>{
    console.log("REDUCER. logOutReducer(). state=",estado, "action=",action);
    let newState = {};
    newState.user = null;
    newState.status=action.estado;
    newState.paco='soy yo';
    return newState;
}
//------------------------------------------------------------------------------------------------
// Definir el ESTADO INICIAL ( initialState)
let estadoInicial = { user:null, status:''};


//--------------------------------------------------------------------------------------------------
// Crear userSlice = subconjunto del state para "usuario"
//   Se le asocia su estado inicial
let userSlice = createSlice({
    name: 'usuario',                   // nombre del slice en el debugger
    initialState: estadoInicial,       // estado inicial
    reducers: {                        // reducers 'normales' es decir síncronos: 
        logOut: logOutReducer
    },
    extraReducers: {                   // reducers que son de tipo asincrono. Un reducer por cada estado de la promise retornada por createAsyncThunk
        [signUp.pending]:  signUpReducer1,
        [signUp.fulfilled]:signUpReducer2,
        [signUp.rejected]: signUpReducer3,

        [signIn.pending]:   signInReducer1,
        [signIn.fulfilled]: signInReducer2,
        [signIn.rejected]:  signInReducer3

    }
})

// Definir y exportar Actions (objeto slice.actions) con los atributos que coincidan en nombre con los reducers
export const { logOut  } = userSlice.actions;
//console.log("usuario.js userSlice:", userSlice);

// Exportar el Slice (no se por qué se exporta userSlice.reducer en lugar de userSlice)
export default userSlice.reducer;

//console.log("USERSLICE.ACTIONS:", userSlice.actions);

