import React from "react";
import styled from "styled-components";
import Pie from "../elementos/Footer";
import Cabecera from "../elementos/Header";

//LayoutContainer no tiene contenido, solo estilo css con styled
let LayoutContainer = styled.div`
    display:grid;
    min-height: 100vh;   //container ajusta a alto pantalla
    grid-template-rows: auto minmax(0,1fr) auto; //tres filas: nav, main, footer, main puede ocuparlo todo
    & nav {
        background-color: gray;
        height: 5em;
    }
    & footer {
        height: 5em;
        background-color: gray;
    }
`;

//Contenedor pequeño para fotos
export let SmallContainer = styled.div`
    width:${(tema)=>tema.theme.dims.width.small};
    max-width: 100vw ;
    margin: 0 auto;
    background: pink;
`


let LayoutApp = (props)=>{
    return (
        <LayoutContainer>
           <Cabecera />
            <main>
                <p>MAIN</p>
                {props.children}
            </main>
           <Pie />
        </LayoutContainer>
    )
}

export default LayoutApp;

