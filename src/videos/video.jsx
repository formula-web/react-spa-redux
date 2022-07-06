// Componente para mostrar un solo VIDEO
// usado en componente VIDEOS
// usa el componente VIDEOPLAYER

import React from "react";
import config from '../config/config';
import Videoplayer from "./Videoplayer";
import { likeVideo } from "../store/likes";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import BotonLike from "./BotonLike";

//VideoContainer
let VideoContainer = styled.div `
    position: relative;
    padding-bottom: 177%;
    margin-bottom: ${ (tema)=>tema.theme.dims.margin.normal   };
    background-color: ${ (tema)=>tema.theme.colores.black     };
    & iframe {
        z-index: 1;
    }
    & .info{
        position: absolute;
        z-index: 2;
        display: grid;
        grid-template-rows: minmax(0,1fr) 100px;
        grid-template-columns: minmax(0,1fr) auto;
        grid-template-areas: 'main sidebar'
                             ' info sidebar';
        align-items: flex-start;
        transition: opacity 0.2s ease-in;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        & article, & aside, &.user-info{ 
            padding: ${(tema)=>tema.theme.dims.padding.largepadding };
        };
        &  article.main{ grid-area: main;}
        &  aside.sidebar { grid-area: sidebar} 
        & .user-info{grid-area: info; align-self: middle; }
    }
`; //fin VideoContainer


let Video = ({video})=>{
    let dispatcher  = useDispatch(); //dispatcher para invocar reducers/actions 
    let darLike=({videoId, like})=>{
        dispatcher( likeVideo({videoId,like}));
        dispatcher( {type: 'videos/ponerLike', videoId:videoId, like:like} );
    }

    return (
    <VideoContainer key={`video${video.id}`} id={`video${video.id}`}>
        <div className="info">
            <aside className='sidebar'>
                <BotonLike video={video} like={true} darLike={darLike} />
                <br></br>
                <span>{ video.isLikedByCurrentUser ? " ❤ " :" No "  }</span>
                <br></br>
                <BotonLike video={video} like={false} darLike={darLike} />
            </aside>
            <div className="user-info">
                <h2>{video.title}</h2>
                {`${config.servidorVideos}/${video.remoteMp4}` } 
            </div>

        </div>
        <Videoplayer video={video} />
 
    </VideoContainer>
    )
}

export default Video;