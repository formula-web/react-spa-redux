//Componente React para Mostrar un solo Video recibido con su parametro id en el path
// Primero carga el video usando el reducer videos/getVideo  que carga el video desde el sevicio web externo videos.api
// Despues muestra el video y el player con el componente Videoplayer

import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getVideo } from "../store/videos";
import Videoplayer from "./Videoplayer";

let VideoShow=(props) =>{
    let {id } = useParams();    //Recoger valor del parametro id 
    console.log("Componente <VIDEOSHOW>.   id=",id );
    let dispatch = useDispatch();
    let yacargado = useRef(false);
    
    //cargar el video al hacer el mount del componente
    useEffect( ()=>{
        if ( yacargado.current )  return;
        console.log("VideoShow.useEffect (componente montado)")
        if (!yacargado.current) {
            dispatch ( getVideo(id ));
            yacargado.current=true;
            console.log("__VideoShow_getVideo__ cargado video: ");
        }
    },[])
    
    let videoActual = useSelector( state=>{
            let video = state.sliceVideos.videoActual
            console.log("___________se ejecuta useSelector___  videoActual: ",  video);
            return video;
        }
    );

    return (
        <div>
            {
                videoActual && 
                <>
                    <h2>{videoActual.title}</h2>
                    <Videoplayer video={videoActual} />
                </>
            }
        </div>
    )

}
export default VideoShow;
