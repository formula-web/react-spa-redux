import styled from "styled-components";
import { Titulo } from "../theme";

let Header = (props)=>{
    return (
        <header className={props.className} >
            <img src ="/logo.svg"></img>
            <Titulo>TicTak Application</Titulo>
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
