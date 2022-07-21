import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Pie from "../elementos/Footer";
import Cabecera from "../elementos/Header";

//LayoutContainer no tiene contenido, solo estilo css con styled
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

//Contenedor pequeño para fotos
export let SmallContainer = styled.div`
    width:${(tema)=>tema.theme.dims.width.small};
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

