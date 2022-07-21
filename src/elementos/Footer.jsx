import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";


let Footer = (props)=> {
    let usuario = useSelector( (state)=>state.sliceUsuario.user  );
    return (
        <footer className={props.className}>    
            <Link to="/">Home</Link>
            <Link to="/videos">Videos</Link>
            <BotonPie to="/videos/nuevo">+</BotonPie>
            <Link to = "/usuarios/miperfil">Perfil</Link>
            { usuario 
                ? <button >LogOut </button>
                : <button >Login  </button>
            }

        </footer>
    )
}

export default styled(Footer)`
    display: grid;
    grid-template-columns: minmax(auto,1fr)  minmax(auto,1fr) auto minmax(auto,1fr);
    border: 1px solid;
    border-color: ${({theme})=>theme.colores.gris};
    height: 3em;
    text-align: center;
    justify-content: space-around;
    align-items: center;
`;

let BotonPie = styled(Link)`
     border-radius: ${({theme })=>theme.dims.borderRadius.normal };
     text-decoration: none;
     padding: ${(tema)=>tema.theme.dims.padding.medio };
     background-color:${({theme})=>theme.colores.acento } ;
     color: ${({theme})=>theme.colores.blanco } ;
     font-size: 1.5em;
     align-items: center;
     justify-content: center;
     border:0;
     box-shadow: ${({theme})=>theme.dims.sombras.prof2 };
`;