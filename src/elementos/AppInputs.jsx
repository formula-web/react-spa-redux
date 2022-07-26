import styled from "styled-components";

let Fieldset = styled.fieldset `
    border: 0;
    max-width: ${({theme})=>theme.dims.width.forms };
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    margin-top: ${({theme})=>theme.dims.margin.intersection}  ;
`;


let AppInput = (props) =>{
    return (
        <Fieldset>
            <label htmlFor="">{props.label}</label>
            <Input {...props}></Input>
        </Fieldset>
    )
}

export default AppInput;

let Input = styled.input`
    padding: ${({theme})=>theme.dims.padding.medio };
    font-size: 1em;
    display: block;
    box-sizing: border-box;
    margin-top: ${({theme})=>theme.dims.margin.small };
    outline: none;
    border: none;
    border-radius: ${({theme})=>theme.dims.borderRadius.normal };
    background-color: ${({theme})=>theme.colores.gris};
`;