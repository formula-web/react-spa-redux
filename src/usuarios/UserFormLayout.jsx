import React from "react";
import { ContainerCentrado } from "../theme";

let UserFormLayout = (props)=> {
    return (
        <div>
            <ContainerCentrado>
                    {props.children}
            </ContainerCentrado> 

        </div>
    )
}
export default UserFormLayout;