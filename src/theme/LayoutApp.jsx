// Define LayoutApp: componente que marca la estructura principal de la app. usa LayouContainer
// que define div contenedor y estilos para areas nav y footer
// Define SmallContainer:  contenedor para una foto y su info
import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Pie from "../elementos/Footer";
import Cabecera from "../elementos/Header";
import dispositivos from '../theme/breakpoints';

//LayoutContainer es un DIV vacio estilizado con styled. Usar como un wrapper 
//define estilos para subelementos NAV y FOOTER
let LayoutContainer = styled.div`
    display:grid;
    min-height: 100vh;   //container ajusta a alto pantalla
    grid-template-rows: auto auto auto; //tres filas: nav, main, footer, main puede ocuparlo todo
    & nav {
        background-color: gray;
        height: 5em;
    }
    & footer {
        height: 5em;
        background-color: gray;
    }
`;

//Contenedor estrecho para listado de fotos
export let SmallContainer = styled.div`
    @media ${dispositivos.mobile}, ${dispositivos.tablet} {
        width:${(tema)=>tema.theme.dims.width.tiny};
    }

    @media ${dispositivos.mediumLaptop} {
        width:${(tema)=>tema.theme.dims.width.small};
    }
    @media ${dispositivos.maxLaptop} {
        width:${(tema)=>tema.theme.dims.width.large};
    }
    max-width: 100vw ;
    margin: 0 auto;
    background: pink;
`

//LayoutApp contiene el esqueleto de la App: cabecera, cuerpo, pie
//Se una en App.js como componente que envuelve el resto de contenido. {props.children} representa el 
// conteido envuelto.
let LayoutApp = (props)=>{
    // Usando Routes indicamos que <Cabecera /> se muestre en ciertas páginas
    return (
        <LayoutContainer>
            <Cabecera/>
            <Routes>
                <Route path="/videos" element={<nav><p>MENU DE VIDEOS</p></nav>}></Route>
                <Route path="/usuarios/*" element={<nav><p>MENU DE USUARIOS</p></nav>}></Route>
                <Route path="*" element={<nav><p>MENU GENERAL NO DE USUARIOS NI VIDEOS</p></nav>}></Route>
            </Routes>
           
            <main>
                <p>MAIN</p>
                {props.children}
            </main>
           <Pie />
        </LayoutContainer>
    )
}

export default LayoutApp;

