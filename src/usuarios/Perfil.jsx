import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { loadVideosUser } from "../store/videos";
import { SmallContainer } from "../theme/LayoutApp";
import Videoplayer from "../videos/Videoplayer";
import Videos from "../videos/Videos";
import LogoutBoton from "./LogoutBoton"

// Contenedor principal PerfilHeader
// Grid 6 columnas iguales grid-template-columns
// Grid filas 100px de alto    grid-template-rows
// Grid template-areas:  da nombres a cada celda para -->
//   usando grid-area: nombre   se ubican los divs en celdas precisas
let PerfilHeader = styled.header`
display: grid;

grid-template-columns: repeat(6, minmax(auto,1fr));
grid-template-rows: 150px;
grid-template-areas: "imagen   imagen   imagen   imagen   imagen   imagen"
                     "userinfo userinfo userinfo userinfo userinfo logout"
                     "conta1   conta2   conta3   conta4   conta5   conta6"
                     "videos   videos   videos   videos   videos   videos"
                      ;
                   
text-align: center;
& .imagencont {
    grid-area: imagen;

}
& .userinfocont {
    grid-area: userinfo;
}


& .videoscont {
    grid-area: videos;
}    

`;

let PerfilImagen = styled.img`
  max-height  : 20vh;
  border-radius: 50%;
`;

//Este styled div recibe un argumento grid area (en los atributos html de la llamada)
let Contador = styled.div`
    grid-area: ${({area})=>area}; 
    & .numero {
        font-size: ${({theme})=>theme.dims.fonts.medium};
        display:  block;
        
    }
    & .descripcion {
        color:  ${({theme})=>theme.colores.plata};
    }
    
`;

let Pill = styled.span`
    background-color: ${ ( {theme})=>theme.colores.azul};
    border-radius: ${ ( {theme})=>theme.dims.borderRadius.normal};
    padding: ${ ({theme})=>theme.dims.padding.tiny };
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
                {usuario?  <p><strong>Usuario: {usuario.username}</strong></p>: <p>No user</p> }
                <Pill>{videos.length}</Pill> Videos subidos
            </div>
            <Contador area='conta5'>
                <p className="numero">89</p>
                <p className="descripcion">Seguidores</p>
            </Contador>
            <Contador area='conta3'>
                <p className="numero">9</p>
                <p className="descripcion">Seguidos</p>
            </Contador>
            <Contador area='logout'>
                <LogoutBoton>Cerrar Sesion</LogoutBoton>
            </Contador>
            
            <div className="videoscont">{
                <Videos />
                /*
                videos.map( (video,index)=>
                    (
                    <div key={index}>
                        <h2>{video.title}</h2>
                        <Videoplayer video={video} />
                    </div>
                    )
                )
                */
            }</div>
        </PerfilHeader>
        </SmallContainer>
        </>
    )
}
export default Perfil;