import { PlayerSdk } from "@api.video/player-sdk";
import React from "react";

let Videoplayer = ({video})=>{
    return (
        <span
           title={video.title}
           src  ={`video.remoteMp4`}
           width="100%"
           height="100%"
           scrolling="no"
           allowFullScreen={true}
           frameBorder="0"
        >--aqui iframe  Videoplayer.jsx de http://{video.remoteMp4}--</span>
    )
}
export default Videoplayer;

