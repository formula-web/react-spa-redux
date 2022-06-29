import {   createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import config from '../config/config.js';
import Axios from 'axios';

let estadoInicial = {
    status: 'No cargado',
    data: {}
}


let likeSlice = createSlice({
        name: 'likes',                   // nombre del slice en Redux
        initialState: estadoInicial,       // estado inicial
        reducers: {                        // reducers 'normales' es decir síncronos: 
        },
        extraReducers: {        // reducers que son de tipo asincrono. Un reducer por cada estado de la promise retornada por createAsyncThunk
            [likeVideo.pending]:    (state,action)=>{state.status='Pendiente' },
            [likeVideo.fulfilled]:  (state,action)=>{state.status='Like Ok'; state.data = action.payload; },
            [likeVideo.rejected]:   (state,action)=>{state.status='Rejected' },
        }
    }


); //createSlice


// *** REDUCER ASINCRONO  likes/likeVideo ****
// Anota un like en un video usando en servicio remoto correspondiente
// createAsyncThunk retorna una promise que deja el resultado en action.payload
export const likeVideo = createAsyncThunk ('likes/likeVideo', async (  videoId, thunkAPI )=>{
    console.log("Entrando en reducer loadVideosUser()... thunkAPI:",thunkAPI.getState() );
    //thunkAPI permite acceder al store/state global de Redux. Cogemos el token jwt qie está en la propiedad user del state de sliceUsuario:
    let tokenjwt=null;
    try {
        tokenjwt = thunkAPI.getState().sliceUsuario.user.jwtToken;
    }catch {
        console.log('likeVideo(): no hay token jwt');
        return Promise.reject("No ha token jwt. Usuario no logado ?");
    }
    if (!tokenjwt) return Promise.reject("Token vacio");
    
    //console.log('...tokenjwt:',tokenjwt );

    // descarga video en asincrono llamando al servicio web 
    let respuesta=await Axios.get(`${config.servicioVideoapi}${config.endPointLike}`, 
      { like: { videoId: videoId} },   
      {
        headers:{
            Authorization: `Bearer ${tokenjwt} `,
        }
      }
    ); //Axios.post

    console.log("Respuesta servicio web"+`Config.servicioVideoapi/users/videos`, respuesta.data);
    return respuesta.data;
});

export default likeSlice.reducer;