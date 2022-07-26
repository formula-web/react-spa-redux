//Componente VIDEOS visualiza un listado de videos
//usa el componente VIDEO para visualizar un solo video

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { borrar1Video, loadVideos, ponerLike } from "../store/videos";
import Videoplayer from "./Videoplayer";
import config from '../config/config';
import { useRef } from "react";
import store from "../store";
import { likeVideo } from "../store/likes";
import { SmallContainer} from "../theme/LayoutApp";
import Video from "./video";
import { useNavigate } from "react-router-dom";

//Componente Cabecera comun a todas las subpaginas de /videos
export let ComunVideos = () => {
    let dispatcher = useDispatch();
    let Navegador = useNavigate();
    let iraHome = () => { Navegador('/') }
    let borrarVideos = ()=>{  store.dispatch ( {type:'videos/clearVideos'} ) }
    let cargarVideos = ()=>{  store.dispatch( loadVideos( {par1: "video1"}) ) }
    //let borra1Video = ()=>{  store.dispatch ( {type:'videos/borrar1Video', videoid: document.querySelector("#quevideo").value} ) }
    let borra1Video = ()=>{  store.dispatch ( {type: borrar1Video, videoid: document.querySelector("#quevideo").value} ) }
    return (
      <>
        <h2>Elemento cabecera comun de /videos</h2>
        <button onClick={iraHome}>Home</button>
        <button onClick={borrarVideos}>Borrar Videos</button>
        <button onClick={cargarVideos}>Cargar Videos</button>
        <button onClick={borra1Video}>Borrar un Video</button>
        <input id='quevideo'></input>
        
      </>
    )
  
  }




// Componente Videos 
let Videos=(  )=>{
    console.log("<<<<<<RENDERIZANDO VIDEOS.JSX  inicio >>>>>>");
    let primeravez = useRef(false);

    //-- recoger y suscribirse a los cambios en state.sliceVideos:
    let stateVideos = useSelector(state=>state.sliceVideos); //recoge estado videos y se subscribe. Si cambia, se renderiza Videos
    //let stateLikes = useSelector(state=>state.sliceLikes);   //recoge estado likes y se subscribe. Si cambia se renderiza Videos

//     console.log("Videos en el state:", stateVideos.data.videos.length);
    
    let dispatcher  = useDispatch(); //dispatcher para invocar reducers/actions 
    //console.log("stateVideos:", stateVideos.data.videos[0].title);
    
    //Invocar hook con useEffect( fx(),[] ) fx ejecuta al renderizar componente por primera vez
    // y llamar al reducer loadVideos del state videos
    useEffect( 
        ()=>{ 
            console.log("videos.jsx - carga inicial - llama a loadvideos()")
            if ( true ) {
                //console.log("<Videos> useEffect al Montarse el componente. ¿Se ejecuta dos veces?");
                dispatcher( loadVideos() );   
            }
            primeravez.current=true;
        }
        ,[]); //,[]  Indica que se ejecuta al renderizar por primera vez. Equivale a comtponentDidMount()
    

    let darLike=({videoId, like})=>{
        dispatcher( likeVideo({videoId,like}));
        dispatcher( {type: 'videos/ponerLike', videoId:videoId, like:like} );
    }


    return (
        <>
          <h2> Listado de Videos</h2>
            <div>
                <SmallContainer>
                { stateVideos.data.videos.map(video=>(
                   <Video video={video} key={video.id} />
                )) }
                </SmallContainer>
            </div>
          <h2>.........................................................</h2>
          {     console.log("<<<<<<VIDEOS.JSX  fin >>>>>>") }
        </>
    )
}

export default Videos;