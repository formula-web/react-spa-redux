import styled from "styled-components";
import Reloj from "../Reloj";
import { Titulo } from "../theme";

let Header = (props)=>{
    return (
        <header className={props.className} >
            <img src ="/logo.svg"></img>
            <Titulo>TicTak Application</Titulo>
            <div className="reloj"><Reloj /></div>
        </header>
    )
}

export default styled(Header)`
    text-align: center;
    padding: 1em 0;
    img {
        vertical-align: middle;
    }
    
`;
