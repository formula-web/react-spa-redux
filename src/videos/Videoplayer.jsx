// Player de Video con un simple <iframe>
// Controles: utiliza un objeto de libreria:  PlayerSdk para habilitar mute, play, loop,..
// Parametros: video = componente con los datos del video, incluido el src
//   la primera instancia de Videoplayer instancia un objeto PlayerSdk
//   utiliza un iframe

import { PlayerSdk } from "@api.video/player-sdk";  // VIDEOPLAYER:  https://docs.api.video/docs
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import config from '../config/config';

//Estiliza el iframe con Styled, para que se ajuste al contenedor donde se ubicara Videoplayer y no se salga
let Iframe = styled.iframe`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
`



let Videoplayer = ({video})=>{
    let player = useRef(null);
    //console.log("entra a renderizar un Videoplayer con video.id=", video.id, " el player sdk es=", player.current)
    useEffect(()=>{
        if (!player.current) {
            player.current = new PlayerSdk(`#appPlayer-${video.id}`,{muted:true});
            player.current.mute();    
            player.current.play();
            player.current.setLoop(true);
            //console.log("....nuevo sdk player.current para video.id=",video.id, player.current)
        }
    },[video.id])    //Se ejecuta cada vez que cambie video.id
    return (
        <iframe
           title={video.title}
           src  ={config.servidorVideos  + "/" + video.remoteMp4}
           width="100%"
           height="100%"
           scrolling="no"
           id={`appPlayer-${video.id}` }
           allowFullScreen={true}
           frameBorder="0"
        ></iframe>
    )
}
export default Videoplayer;

