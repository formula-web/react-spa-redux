//DEFINIR UN STATE PARA LOS VIDEOS:   sliceVideos
// Estado de videos gestionado con Redux. Definir y Exportar Slice y Reducers:
//  Slice 'videos' 
//  Reducers videos:  loadVideos (asincrono), crearVideo (asincrono),  clearVideos
//  Exports: 
//           Slice 'videos':      videoSlice.reducer      
//           Reducers:           ??, ??

import {   createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import config from '../config/config.js';
import Axios from 'axios'; //axios==libreria js llamadas ajax (similar a fetch)

//console.log( "Config.servicioVideoapi:", `${config.servicioVideoapi}/videos` );

// Definir y exportar Reducer
// Definir y exportar Reducer/action 'loadVideos' que se resuelve en modo asíncrono. 
// createAsyncThunk retorna una promise que deja el resultado en action.payload
// *** LOADVIDEOS ****
export const loadVideos = createAsyncThunk ('videos/loadVideos', async (  pagina = 1, thunkAPI )=>{
    console.log("loadVideos()... thunkAPI:",thunkAPI.getState() );
    //thunkAPI permite acceder al store/state global de Redux. Cogemos el token jwt qie está en la propiedad user del state de sliceUsuario:
    let tokenjwt=null;
    try {
        tokenjwt = thunkAPI.getState().sliceUsuario.user.jwtToken;
    }catch {
        console.log('loadVideos(): no hay token jwt');
        return Promise.reject("No ha token jwt. Usuario no logado ?");
    }
    if (!tokenjwt) return Promise.reject("Token vacio");
    
    console.log('...tokenjwt:',tokenjwt );

    // descarga video en asincrono llamando al servicio web 
    let respuesta=await Axios.get(`${config.servicioVideoapi}/videos?page=${pagina}`, 
      {
        headers:{
            Authorization: `Bearer ${tokenjwt} `,
            Micabecera: 'yomismo'

        }
      }
    ); //Axios.post

    console.log("Respuesta servicio web"+`Config.servicioVideoapi/videos?page=${pagina}`, respuesta.data);
    return respuesta.data;
});
// Definir y exportar Reducer/action 'crearVideo' que se resuelve en modo asíncrono. 
// createAsyncThunk retorna una promise que deja el resultado en action.payload
// *** CREARVIDEO ****
export const crearVideo = createAsyncThunk ('videos/crearVideo', async ( formData, thunkAPI )=>{
    console.log("reducer crearVideo()...");
    //thunkAPI permite acceder al store/state global de Redux. 
    //Comprobar que existe el token jwt en la propiedad user del state de sliceUsuario:
    let tokenjwt=null;
    try {
        tokenjwt = thunkAPI.getState().sliceUsuario.user.jwtToken;
    }catch {
        console.log('loadVideos(): no hay token jwt');
        return Promise.reject("No ha token jwt. Usuario no logado ?");
    }
    if (!tokenjwt) return Promise.reject("Token vacio");
    console.log('...tokenjwt:',tokenjwt );
    // --------------------

    // Envio Ajax POST de los datos del video (formData) al servicio web del servidor remoto (/video-apis)
    console.log("enviando peticion POST a ",`${config.servicioVideoapi}/videos`,formData);
    let respuesta=await Axios.post(`${config.servicioVideoapi}/videos`, formData, 
      {
        headers:{
            Authorization: `Bearer ${tokenjwt} `
        }
      }
    ); //Axios.post

    console.log("...respuesta servicio web"+`Config.servicioVideoapi/videos`, respuesta.data);
    return respuesta.data;
});

//REDUCER:  clearVideos
let clearVideosReducer=(state,action)=>{
    console.log("clearVideosReducer, state=",state.sliceUsuario);
    let newstate = state;
    newstate.status= 'Videos borrados';
    newstate.data.videos=[];
    newstate.data.nextPage= 1;
    newstate.data.total=0;
    return newstate;
}

//REDUCER:  cambiaEstado
let cambiaEstadoReducer=(state,action)=>{
    console.log("clearVideosReducer, state=",state.sliceUsuario);
    let newstate = state;
    newstate.status= action.estado;
    newstate.data.videos=Array.from(state.data.videos);
    newstate.data.nextPage= 1;
    newstate.data.total=0;
    return newstate;
}

// CREAR EL SLICE videoSlice (Estado para la entidad Videos) 
let estadoInicial = {
    status: 'Inicial Videos',
    data: {
        videos:[],    //array con los videos ya descargados
        nextPage: 1,  //siguiente pagina a mostrar/descargar ?
        total: 1      //Numero total de videos existente 
 }
}

// CREAR EL SLICE videoSlice (Estado para la entidad Videos) 
let videoSlice = createSlice({
    name: 'videos',                   //nombre del slice en el debugger
    initialState: estadoInicial,      //Estado Inicial 
    reducers: {                       // reducers 'normales'  es decir síncronos:
            clearVideos: clearVideosReducer,
            cambiaEstado: cambiaEstadoReducer
    },

    // reducers que son de tipo asincrono. Un reducer por cada estado de la promise retornada por createAsyncThunk
    extraReducers: {
        [loadVideos.fulfilled]: (state, action)=>{
            let { currentPage, nextPage, prevPage, total } = action.payload;
            state.status="Cargados OK";
            state.data.videos = [];
            state.data = {
                currentPage,
                nextPage,
                prevPage,
                total,
                videos: state.data.videos.concat(action.payload.videos)
            }
        },
        [loadVideos.rejected]: (state, action)=>{
            let { currentPage, nextPage, prevPage, total } = null;
            state.status="Fallo en la carga.";
            state.data = {
                currentPage,
                nextPage,
                prevPage,
                total,
                videos: null 
            }
        },
        [crearVideo.fulfilled]: (state, action)=>{
                state.status="Creado video OK";
                state.data = {
                    currenPage:1,
                    nextPage:1,
                    prevPage:0,
                    total:0,
                    videos: state.data.videos.concat(action.payload.videos)
                }
        },
        [crearVideo.rejected]: (state, action)=>{
            state.status="Error creando video";
            state.data = {
                currenPage:0,
                nextPage:0,
                prevPage:0,
                total:0,
                videos: state.data.videos.concat(action.payload.videos)
            }
        },

    }

    
});

// Exportar el Slice (no se por qué se exporta videoSlice.reducer en lugar de videoSlice)
export default videoSlice.reducer;
export const { clearVideos, cambiaEstado } = videoSlice.actions;

//console.log("UVIDEOSSLICE.ACTIONS:", videoSlice.actions);

