import React from "react";
import { useDispatch } from "react-redux";
import "../css/VideosForm.css";
import { crearVideo } from "../store/videos";


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
        <div>
            <form id='nuevovideo' onSubmit={ onSubmit }>
                <input type='file' name='video' />
                <input type='text' name='titulo' placeholder="titulo" />
                <input type="submit" value="Enviar" />
            </form>
        </div>
    )
}
export default VideosForm;