//Componente React para Mostrar contenido de la pagina videos/:id
// muestra un solo Video recibido con su parametro id de la url
// Primero carga el video usando el reducer videos/getVideo  que carga el video desde el sevicio web externo videos.api
// Despues muestra el video y el player con el componente Video que a su vez usa el Videoplayer

import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getVideo } from "../store/videos";
import Videoplayer from "./Videoplayer";
import Video from "./Video";
import { SmallContainer} from "../theme/LayoutApp";

let VideoShow=(props) =>{
    let {id } = useParams();    //Recoger valor del parametro id 
    console.log("Componente <VIDEOSHOW>.   id=",id );
    let dispatch = useDispatch();
    let yacargado = useRef(false);  //declara atributo persistente, global a las instancias del componente y que se consulta con el atributo current:  yacargado.current
    
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
        <SmallContainer>
            {
                videoActual && 
                <>
                    <h2>{videoActual.title}</h2>
                    <Videoplayer  video={videoActual} />
                    <Video  video={videoActual} />
                </>
            }
        </SmallContainer>
    )

}
export default VideoShow;
