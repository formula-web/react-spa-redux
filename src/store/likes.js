import {   createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import config from '../config/config.js';
import Axios from 'axios';

let estadoInicial = {
    status: 'No cargado',
    data: {}
}





// *** REDUCER ASINCRONO  likes/likeVideo ****
// Anota un like en un video usando en servicio remoto correspondiente
// createAsyncThunk retorna una promise que deja el resultado en action.payload
export const likeVideo = createAsyncThunk ('likes/likeVideo', async (  {videoId,like=true}, thunkAPI )=>{
    console.log("Entrando en reducer likeVideos()...videoId= ",videoId,like );
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

    // post al endpoint para poner like al video 
    let respuesta={};
    if ( like )  {
            console.log(".......Axios like");
            respuesta=await Axios.post(`${config.servicioVideoapi}${config.endPointLike}`, 
            { like: { videoId: videoId} },   
            {
                headers:{
                    Authorization: `Bearer ${tokenjwt} `,
                }
            }
        ); //Axios.post
    } else { // post al endpoint para quitar like al video 
        console.log(".......Axios Unlike",`${config.servicioVideoapi}${config.endPointLike}/${videoId}`);
        respuesta=await Axios.delete(`${config.servicioVideoapi}${config.endPointLike}/${videoId}`, 
        {
            headers:{
                Authorization: `Bearer ${tokenjwt} `,
            }
        }
        ); //Axios.post
    }

    console.log("Respuesta servicio web de like video:", respuesta.data);
    return respuesta.data;
});



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

export default likeSlice.reducer;