import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadVideosUser } from "../store/videos";
import Videoplayer from "../videos/Videoplayer";

let Perfil = ()=>{
    let dispatcher = useDispatch();
    let usuario    = useSelector( (state)=>state.sliceUsuario.user );
    let videos     = useSelector( (state)=>state.sliceVideos.data.videos);

    useEffect (()=>{
        dispatcher( loadVideosUser() );

    }    
    ,[])

    return (
        <div>
            <h1>Perfil de Usuario</h1>
            <div>{
                videos.map( (video,index)=>
                    (
                    <div key={index}>
                        <h2>{video.title}</h2>
                        <Videoplayer video={video} />
                    </div>
                    )
                )
            }</div>

        </div>
    )
}
export default Perfil;