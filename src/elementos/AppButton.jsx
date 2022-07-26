import styled from "styled-components";




let Button = styled.button`
    padding: ${({theme})=>theme.dims.padding.small };
    font-size: 1em;
    display: block;
    box-sizing: border-box;
    margin-top: ${({theme})=>theme.dims.margin.small };
    outline: none;
    border: none;
    border-radius: ${({theme})=>theme.dims.borderRadius.normal };
    background-color: ${({theme})=>theme.colores.gris};
`;

let AppButton = (props) =>{
    return (
        <Button {...props}></Button>
    )
}

export default AppButton;