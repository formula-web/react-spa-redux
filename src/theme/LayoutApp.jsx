import React from "react";
import styled from "styled-components";

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

let LayoutApp = (props)=>{
    return (
        <LayoutContainer>
            <nav><p>Menu</p></nav>
            <main>
                <p>MAIN</p>
                {props.children}
            </main>
            <footer><p>Footer</p></footer>
        </LayoutContainer>
    )
}

export default LayoutApp;

