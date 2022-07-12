import React from "react";
import { useDispatch } from "react-redux";
import { likeVideo } from "../store/likes";
import { ClearButton, SvgButton } from "../theme";

let BotonShare = ( {video, like, darLike} )=> {


    return (
        <ClearButton onClick={()=>darLike({videoId:video.id, like:like})}>
            <SvgButton src='/share.svg' ></SvgButton>
        </ClearButton> 
    )
}
export default BotonShare;