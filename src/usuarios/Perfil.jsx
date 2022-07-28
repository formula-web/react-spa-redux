import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { loadVideosUser } from "../store/videos";
import { SmallContainer } from "../theme/LayoutApp";
import Videoplayer from "../videos/Videoplayer";

let PerfilHeader = styled.header`
display: grid;

grid-template-columns: repeat(6, minmax(auto,1fr));
grid-template-rows: 200px;
grid-template-areas: "imagen   imagen   imagen   imagen   imagen   imagen"
                     "userinfo userinfo userinfo userinfo userinfo userinfo";
                   
text-align: center;
& .imagencont {
    grid-area: imagen;

}
& .userinfocont {
    grid-area: userinfo;
}
    
`;

let PerfilImagen = styled.img`
  max-height  : 20vh;
  border-radius: 50%;
`;

//Este styled div recibe un argumento grid area (en los atributos html de la llamada)
let Contador = styled.div`
    grid-area: ${ ( {gridarea})=>gridarea };
    
`;

let Perfil = ()=>{
    let dispatcher = useDispatch();
    let usuario    = useSelector( (state)=>state.sliceUsuario.user );
    let videos     = useSelector( (state)=>state.sliceVideos.data.videos);

    useEffect (()=>{
        dispatcher( loadVideosUser() );

    }    
    ,[])

    return (
        <>

 
        <SmallContainer>
        <PerfilHeader>       
            <div className="imagencont">
                <PerfilImagen src="/huevos.jpg" />
            </div>
            <div className="userinfocont">
                <Contador>{videos.length} Videos subidos</Contador>
            </div>


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
        </PerfilHeader>
        </SmallContainer>
        </>
    )
}
export default Perfil;