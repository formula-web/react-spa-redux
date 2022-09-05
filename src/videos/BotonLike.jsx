import React from "react";
import { useDispatch } from "react-redux";
import { likeVideo } from "../store/likes";
import { ClearButton, SvgButton } from "../theme";

let BotonLike = ( {video, like, darLike} )=> {


    return (
        <ClearButton onClick={()=>darLike({videoId:video.id, like:like})}>
            <SvgButton src='/corazon.svg' activo={video.isLikedByCurrentUser}></SvgButton>
        </ClearButton> 
    )
}
export default BotonLike;

export let BotonUnLike = ( {video, darLike} )=> {


    return (
        <ClearButton onClick={()=>darLike({videoId:video.id, like:false})}>
            Unlike
        </ClearButton> 
    )
}