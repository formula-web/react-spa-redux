// THEME CSS definicion de theme css global

import { ReactSVG } from "react-svg";
import styled from "styled-components";

const nombrecualquiera={    //da igual como se llame al final queda objetoimportado.theme.colores 
    colores: {
        blanco:'#ffffff',
        oscuro:'#27212e',
        negro:'#373737',
        acento:'#e53251',
        gris: '#f2f2f2',
        azul: '#67e7e2'
    },
    dims: {
        padding: {
            largepadding: '10vw'
        },
        paddingamplio: '10vw',
        width:{
            small: '20em',
        },
        margin:{
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
        }

      
    }
}
export default nombrecualquiera;

export let SvgButton = styled(ReactSVG)`
    & svg {  //propiedades css del SVG usado para el SvgButton
        width: ${({theme})=>theme.dims.circle.small };
        height: ${({theme})=>theme.dims.circle.small };
        display: inline-block;
        vertical-align: bottom;     
    } //Propiedades css del SvgButton
    background-color:${({theme})=>theme.colores.black } ;
    cursor: pointer;
    border-radius: 50%;
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

export let ClearButton=styled.button`
    outline:0;
    border:0;
    background-color: transparent;
    font-size: 1em;
    display: block;
`
;