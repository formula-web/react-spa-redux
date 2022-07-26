import React from "react";
import { useDispatch } from "react-redux";
import "../css/VideosForm.css";
import AppButton from "../elementos/AppButton";
import AppInput from "../elementos/AppInputs";
import { crearVideo } from "../store/videos";
import { ContainerCentrado } from "../theme";
import { SmallContainer } from "../theme/LayoutApp";


let VideosForm = (props)=>{
    let dispatcher = useDispatch();
    let onSubmit=(ev)=>{
        ev.preventDefault();
        console.log('onSubmit VideosForm',ev.target.titulo.value, ev.target.video.value);
        let formdata = new FormData();
        formdata.append('video',ev.target.video.files[0]);
        formdata.append('titulo', ev.target.titulo.value);
        console.log('onSubmit VideosForm formData:', ev.target.video.files[0]);
        dispatcher( crearVideo(formdata));
    }
    return ( 
        <ContainerCentrado>
            <SmallContainer>
            <form id='nuevovideo' onSubmit={ onSubmit }>
                <AppButton type='submit'>SUBIR VIDEO</AppButton>
                <AppInput type='file' name='video' />
                <AppInput type='text' name='titulo' placeholder="titulo" />

            </form>
            </SmallContainer>
        </ContainerCentrado>
    )
}
export default VideosForm;