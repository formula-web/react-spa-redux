//Componente VIDEOS visualiza un listado de videos
//usa el componente VIDEO para visualizar un solo video

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadVideos, ponerLike } from "../store/videos";
import Videoplayer from "./Videoplayer";
import config from '../config/config';
import { useRef } from "react";
import store from "../store";
import { likeVideo } from "../store/likes";
import { SmallContainer} from "../theme/LayoutApp";
import Video from "./video";




// Componente Videos 
let Videos=( {videos} )=>{
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