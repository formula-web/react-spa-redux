//Componente React. 
//Renderiza un boton de logout
//Boton de Logout del usuario actualmente logado. Actualiza el state de usuario: state.sliceUsuario

import React from "react";
import { useDispatch } from "react-redux";
import { BotonAccion, ClearButton } from '../theme';
import { logOut } from '../store/usuario';

let LogoutBoton = (props)=> {
    let dispatcher = useDispatch();
    
    let logoutUser = ()=>{
        dispatcher ( {type:logOut ,estado:'Logoff'} );
    }
    
    //retorna la renderizacion del boton
    return (
        <div>
            <BotonAccion className={props.className} onClick={logoutUser}>
                Cerrar Sesión
            </BotonAccion>
        </div>
    )
}

export default LogoutBoton;