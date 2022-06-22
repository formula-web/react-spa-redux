import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadVideos } from "../store/videos";


let Videos=(props)=>{
    console.log("<<<<<<VIDEOS.JSX  inicio >>>>>>");
    //const [ stateVideos,setstateVideos  ] = useState( useSelector(state=>state.sliceVideos) );
    let stateVideos = useSelector(state=>state.sliceVideos);//recoge estado videos
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
        }
        ,[]); //,[]  Indica que se ejecuta al renderizar por primera vez. Equivale a comtponentDidMount()
    
    return (
        <>
        <h2> Inicio Componente VIDEOS...</h2>
            <h3>Status: {stateVideos.status}   </h3>
            <div>
                { stateVideos.data.videos.map(video=>(<div>{video.id} - {video.title}</div>)) }
            </div>
          <h2>.........................................................</h2>
          {     console.log("<<<<<<VIDEOS.JSX  fin >>>>>>") }
     </>
    )
}

export default Videos;