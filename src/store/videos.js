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

// *** REDUCER ASINCRONO  videos/loadVideos ****
// Definir y exportar Reducer
// Definir y exportar Reducer/action 'loadVideos' que se resuelve en modo asíncrono. 
// createAsyncThunk retorna una promise que deja el resultado en action.payload
export const loadVideos = createAsyncThunk ('videos/loadVideos', async (  pagina = 1, thunkAPI )=>{
    console.log("Entrando en reducer loadVideos()... thunkAPI:",thunkAPI.getState() );
    //thunkAPI permite acceder al store/state global de Redux. Cogemos el token jwt qie está en la propiedad user del state de sliceUsuario:
    let tokenjwt=null;
    try {
        tokenjwt = thunkAPI.getState().sliceUsuario.user.jwtToken;
    }catch {
        console.log('loadVideos(): no hay token jwt');
        return Promise.reject("No ha token jwt. Usuario no logado ?");
    }
    if (!tokenjwt) return Promise.reject("Token vacio");
    
    //console.log('...tokenjwt:',tokenjwt );

    // descarga video en asincrono llamando al servicio web 
    let respuesta=await Axios.get(`${config.servicioVideoapi}${config.endPointVideos}?page=${pagina}`, 
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


// *** REDUCER ASINCRONO  videos/loadVideosUser ****
// (identico a loadVideos, solo cambia el path del servicio remoto. Retorna solo los videos del usuario cuyo token se envia)
// Definir y exportar Reducer
// Definir y exportar Reducer/action 'loadVideos' que se resuelve en modo asíncrono. 
// createAsyncThunk retorna una promise que deja el resultado en action.payload
export const loadVideosUser = createAsyncThunk ('videos/loadVideosUser', async (  args, thunkAPI )=>{
    console.log("Entrando en reducer loadVideosUser()... thunkAPI:",thunkAPI.getState() );
    //thunkAPI permite acceder al store/state global de Redux. Cogemos el token jwt qie está en la propiedad user del state de sliceUsuario:
    let tokenjwt=null;
    try {
        tokenjwt = thunkAPI.getState().sliceUsuario.user.jwtToken;
    }catch {
        console.log('loadVideosUser(): no hay token jwt');
        return Promise.reject("No ha token jwt. Usuario no logado ?");
    }
    if (!tokenjwt) return Promise.reject("Token vacio");
    
    //console.log('...tokenjwt:',tokenjwt );

    // descarga video en asincrono llamando al servicio web 
    let respuesta=await Axios.get(`${config.servicioVideoapi}${config.endPointVideosUsuario}`, 
      {
        headers:{
            Authorization: `Bearer ${tokenjwt} `,
            Micabecera: 'yomismo'
        }
      }
    ); //Axios.post

    console.log("Respuesta servicio web"+`Config.servicioVideoapi/users/videos`, respuesta.data);
    return respuesta.data;
});



// *** REDUCER ASINCRONO  videos/getVideo ****
// Definir y exportar Reducer
// Definir y exportar Reducer/action 'getVideo' que se resuelve en modo asíncrono. 
// createAsyncThunk retorna una promise que deja el resultado en action.payload
export const getVideo = createAsyncThunk ('videos/getVideo', async (  videoId, thunkAPI )=>{
    console.log("Entrando en reducer getVideo()... thunkAPI:",thunkAPI.getState() );
    //thunkAPI permite acceder al store/state global de Redux. Cogemos el token jwt qie está en la propiedad user del state de sliceUsuario:
    let tokenjwt=null;
    try {
        tokenjwt = thunkAPI.getState().sliceUsuario.user.jwtToken;
    }catch {
        console.log('getVideo(): no hay token jwt');
        return Promise.reject("No hay token jwt. Usuario no logado ?");
    }
    if (!tokenjwt) return Promise.reject("Token vacio");
    
    //console.log('...tokenjwt:',tokenjwt );

    // descarga video en asincrono llamando al servicio web 
    let respuesta=await Axios.get(`${config.servicioVideoapi}/videos/${videoId}`, 
      {
        headers:{
            Authorization: `Bearer ${tokenjwt} `,
            Micabecera: 'yomismo'

        }
      }
    ); //Axios.post

    console.log("Respuesta servicio web a load video"+`Config.servicioVideoapi/videos/${videoId}`, respuesta.data);
    return respuesta.data;
});




// *** Reducer Asincrono   videos/crearVideo ****
// Definir y exportar Reducer/action 'crearVideo' que se resuelve en modo asíncrono. 
// createAsyncThunk retorna una promise que deja el resultado en action.payload
export const crearVideo = createAsyncThunk ('videos/crearVideo', async ( formData, thunkAPI )=>{
    console.log("Entrando en reducer crearVideo()...");
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


//REDUCER sincrono:  videos/clearVideos
let clearVideosReducer=(state,action)=>{
    console.log("Entrando en reducer clearVideos, action=",action);
    let newstate = state;
    newstate.status= 'Videos borrados';
    newstate.data.videos=[];
    newstate.data.nextPage= 1;
    newstate.data.total=0;
    return newstate;
}

//REDUCER sincrono:  videos/borrar1Video
let borrar1VideoReducer=(state,action)=>{
    console.log("Entrando en reducer borra1Video, action=",action);
    let newstate = state;
    newstate.status= 'Un video borrado';
    newstate.data.videos = state.data.videos.filter ( (video)=>{ if (video.id != action.videoid) return true; else return false; });
    newstate.data.total--;
    console.log("...borra1Video retorna estado:", newstate.data);
    return newstate;
}


//REDUCER sincrono:  videos/cambiaEstado
let cambiaEstadoReducer=(state,action)=>{
    console.log("Entrando en reducer vidoes.cambiaEstado, action=", action);
    let newstate = state;
    newstate.status= action.estado;
    newstate.data.videos=Array.from(state.data.videos);
    newstate.data.nextPage= 1;
    newstate.data.total=0;
    return newstate;
}

//REDUCER sincrono:  videos/ponerLike  (poner like en el estado local ya que likeVideo lo hace solo en la bbdd remota)
let ponerLikeReducer=(state,action)=>{
    console.log("___________________Entrando en reducer ponerLike, action=", action);
    let newstate = state;
    newstate.status= action.estado;
    newstate.data.videos=Array.from(state.data.videos);
    let cual = newstate.data.videos.findIndex ( (video)=>video.id == action.videoId );
    if (cual >=0) newstate.data.videos[cual].isLikedByCurrentUser= action.like;
    return newstate;
}


// CREAR EL SLICE videoSlice (Estado para la entidad Videos) 
let estadoInicial = {
    status: 'Inicial Videos',
    data: {
        videos:[],    //array con los videos ya descargados
        nextPage: 1,  //siguiente pagina a mostrar/descargar ?
        total: 1      //Numero total de videos existente 
    },
    videoActual: null, // video actual en caso de un solo video cargado con getVideo

}

// CREAR EL SLICE videoSlice (Estado para la entidad Videos) 
let videoSlice = createSlice({
    name: 'videos',                   //nombre del slice en el debugger
    initialState: estadoInicial,      //Estado Inicial 
    reducers: {                       // reducers 'normales'  es decir síncronos:
            clearVideos: clearVideosReducer,
            borrar1Video: borrar1VideoReducer,
            cambiaEstado: cambiaEstadoReducer,
            ponerLike : ponerLikeReducer
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
            state.status="Fallo en la carga.";
            state.data = {
                currentPage:null,
                nextPage:null,
                prevPage:null,
                total:0,
                videos: null 
            }
        },
        [crearVideo.fulfilled]: (state, action)=>{
                state.status="Creado video OK";
                state.data.total = state.data.total+1;
                //state.data = {
                   // currenPage:1,
                  //  nextPage:1,
                  //  prevPage:0,
                  //  total:0,
                  //  videos: state.data.videos.concat(action.payload.videos)
                //}
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
        [getVideo.fulfilled]: (state, action)=>{
            state.status="Cargado 1 OK";
            state.videoActual = action.payload; // guarda en videoActual el objeto video devuelto por el servicio web externo

        },
        [getVideo.rejected]: (state, action)=>{
            state.status="Fallo en la carga 1 video.";
            state.videoActual = null;
        },
        [loadVideosUser.fulfilled]: (state, action)=>{
            state.status="Cargado videos usuario OK";
            state.data.videos = action.payload;
        },

    }

    
});

// Exportar el Slice (no se por qué se exporta videoSlice.reducer en lugar de videoSlice)
export default videoSlice.reducer;
export const { borrar1Video, clearVideos, cambiaEstado, ponerLike } = videoSlice.actions;

//console.log("UVIDEOSSLICE.ACTIONS:", videoSlice.actions);

