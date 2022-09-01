// THEME CSS definicion de theme css global

import { ReactSVG } from "react-svg";
import styled, { createGlobalStyle } from "styled-components";

export let EstilosGlobales = createGlobalStyle`
    *{box-sizing: border-box}
`;

// Estas propiedades se importan en App: import tema from './theme' 
// y se comparten en toda la aplicacion con el atributo "theme" al envolverla con  <ThemeProvider theme={tema}>
const propiedadescss={    //da igual como se llame al final queda objetoimportado.theme.colores 
    colores: {
        blanco:'#ffffff',
        oscuro:'#27212e',
        negro:'#373737',
        acento:'#e53251',
        gris: '#f2f2f2',
        azul: '#67e7e2',
        plata: '#716385'
    },
    dims: {
        padding: {
            largepadding: '10vw',
            medio: '0.5vw',
            small: '1em',
            tiny: '0.2em'
        },
        paddingamplio: '10vw',
        width:{
            small: '20em',
            forms: '17.5em'
        },
        margin:{
            small: '1em',
            normal: '2em',
            intersection: '1em'
        },
        fonts: {
            small: '0.8em',
        },
        circle: {
            small:'1em',
        },
        borderRadius:{
            small:'0.4em',
            normal: '0.6em'
        },
        sombras: {
            prof2: '0 2px 2px'
        }

      
    }
}
export default propiedadescss;

export let SvgButton = styled(ReactSVG)`
    & svg {  //propiedades css del SVG usado para el SvgButton
        width: ${({theme})=>theme.dims.circle.small };
        height: ${({theme})=>theme.dims.circle.small };
        display: inline-block;
        vertical-align: bottom;     
    } //Propiedades css del SvgButton
    background-color:${({theme,activo})=>activo? theme.colores.acento : theme.colores.gris } ;
    cursor: pointer;
    border-radius: 50%;
    padding: 10px;
    width: ${({theme})=>theme.dims.circle.medium };
    height: ${({theme})=>theme.dims.circle.medium };
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom:${({theme})=>theme.dims.margin.intersection } ;
    & path {
        fill: ${({theme})=>theme.colores.white } !important ;
    }
`;

//Boton sin estilos. Como contenido de este boton se puede poner un componente SvgButton
export let ClearButton=styled.button`
    outline:0;
    border:0;
    background-color: transparent;
    font-size: 1em;
    display: block;
`
;

export let BotonAccion=styled.button`
   outline: 0;
   border:  3px solid gray;
   background-color: ${propiedadescss.colores.acento};
   color: white;
`

export let Titulo = styled.h1`
    font-size: 1.5em;
    font-weight: bold;
    display: inline-block;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-left: ${({theme})=>theme.dims.margin.intersection };
    vertical-align: middle;
`;

export let ContainerCentrado = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width:  100%;
`;

