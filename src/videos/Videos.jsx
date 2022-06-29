import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadVideos } from "../store/videos";
import Videoplayer from "./Videoplayer";
import config from '../config/config';
import { useRef } from "react";
import store from "../store";
import { likeVideo } from "../store/likes";




// Componente Videos 
let Videos=( {videos} )=>{
    console.log("<<<<<<VIDEOS.JSX  inicio >>>>>>");
    let primeravez = useRef(false);

    //-- recoger y suscribirse a los cambios en state.sliceVideos:
    let stateVideos = useSelector(state=>state.sliceVideos); //recoge estado videos
     console.log("Videos en el state:", stateVideos.data.videos.length);
    
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
    }


    return (
        <>
           {     console.log("_____videos en state al renderizarlos:", stateVideos.data.videos)   }
        <h2> Inicio Componente VIDEOS...</h2>
            <h3>Status: {stateVideos.status}   </h3>
            <div>
                { stateVideos.data.videos.map(video=>(<div key={video.id}>
                <div  id={video.id}> {video.id} - {video.title} ( {`${config.servidorVideos}/${video.remoteMp4}` } )</div>
                <Videoplayer video={video} />
                <button onClick={()=>darLike({videoId:video.id, like:true})}>Like</button> 
                <span>{ video.isLikedByCurrentUser ? "❤" :"No"  }</span>
                <button onClick={()=>darLike({videoId:video.id, like:false})}>Unlike</button> 
                </div>
                )) }
            </div>
          <h2>.........................................................</h2>
          {     console.log("<<<<<<VIDEOS.JSX  fin >>>>>>") }
     </>
    )
}

export default Videos;