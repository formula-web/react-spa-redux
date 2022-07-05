import React from "react";
import config from '../config/config';
import Videoplayer from "./Videoplayer";
import { likeVideo } from "../store/likes";
import { useDispatch } from "react-redux";



let Video = ({video})=>{
    let dispatcher  = useDispatch(); //dispatcher para invocar reducers/actions 
    let darLike=({videoId, like})=>{
        dispatcher( likeVideo({videoId,like}));
        dispatcher( {type: 'videos/ponerLike', videoId:videoId, like:like} );
    }

    return (
    <div key={video.id}>
        <div  id={video.id}> {video.id} - {video.title} ( {`${config.servidorVideos}/${video.remoteMp4}` } )</div>
        <Videoplayer video={video} />
        <button onClick={()=>darLike({videoId:video.id, like:true})}>Like</button> 
        <span>{ video.isLikedByCurrentUser ? " ❤ " :" No "  }</span>
        <button onClick={()=>darLike({videoId:video.id, like:false})}>Unlike</button> 
    </div>
    )
}

export default Video;