import React from "react";
import { useDispatch } from "react-redux";
import { likeVideo } from "../store/likes";

let BotonLike = ( {video, like, darLike} )=> {


    return (
        <button onClick={()=>darLike({videoId:video.id, like:like})}>{like?'Like':'Unlike'}</button> 
    )
}
export default BotonLike;