import { PlayerSdk } from "@api.video/player-sdk";  // VIDEOPLAYER:  https://docs.api.video/docs
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import config from '../config/config';

let Videoplayer = ({video})=>{
    let player = useRef(null);
    console.log("entra a renderizar un Videoplayer con video.id=", video.id, " el player sdk es=", player.current)
    useEffect(()=>{
        if (!player.current) {
            player.current = new PlayerSdk(`#appPlayer-${video.id}`,{muted:true});
            player.current.mute();    
            player.current.play();
            player.current.setLoop(true);
            console.log("....nuevo sdk player.current para video.id=",video.id, player.current)
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

