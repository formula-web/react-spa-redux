// Listado infinito de videos
// List
//    width = ancho del listado
//    heigth = altura visible
//    rowHeight = altura linea
//    rowCount  = Total Elementos de la lista
//    rowRenderer = funcion que retorna siguiente elemento a mostrar

import React from "react";
import Video from "./Video";
import {
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
    InfiniteLoader, List
} from "react-virtualized"

// rowRenderer()  -->Retorna el contenido de una fila. Llamada cuando hay que pintar nueva fila
let rowRenderer = ({index, key, style, parent})=>{ 
    return (<div key={index} style={style}>Listado Infinitoxxx. Mostrar siguiente Elemento. </div>);
}

// Componente VideoList ----------------------------------
let VideosList = ( {videosState, loadNextPage} )=>{
   const cache = React.useRef(
    new CellMeasurerCache({fixedWidth:true, defaultHeight:100})
   ); 
   let isRowLoaded = ({index})=>{   // true = elemento/fila está ya cargado y se puede mostrar
        return !!videosState.data.videos[index];  //true si videos[index] no es null
   };  
   let loadMoreRows = ()=>{ loadNextPage() };  // funcion que carga mas elementos/filas ?
   let xx =  ({onRowsRendered, registerChild})=>(
    <div style={{width:"200px", height:"80vh"}}>
        <AutoSizer>
        { ( {width, height})=>(
            <List
            onRowsRendered={onRowsRendered}
            ref = {registerChild}
            height = {height}
            width={width}
            rowHeight={100}
            rowCount = {4}
            rowRenderer = { ({index, key, style, parent})=>{
                console.log("--rowRenderer--index:",index," video:",videosState.data.videos[index].title);
                let video = videosState.data.videos[index];
                return (<div key={index} style={style}>
                <Video video={video} key={video.id} />
                </div>);
            } }
        >
        </List>

        )}
        </AutoSizer>

    </div>

);

    return (
        <div>
    
            <h2>Listado scroll infinito</h2>
            <div style={{width:"200px", height:"80vh"}}>
                <AutoSizer>
                { ({width, height})=>(
                    <List          
                        height = {height}
                        width={width}
                        rowHeight={cache.current.rowHeight}
                        deferredMeasurementCache={cache.current}
                        rowCount = {10}
                        /* Renderiza item video de posicion index del state de videos: */
                        rowRenderer = { ({index, key, style, parent})=>{ 
                            let video = videosState.data.videos[index];
                            return (
                            <CellMeasurer
                                key={key}
                                cache={cache.current}
                                parent={parent}
                                columnIndex={0}
                                rowIndex={index}
                            >
                                <div key={index} style={style}>
                                    {video?<Video video={video} key={key} />:<p>no video</p>}
                                    Titulo: { videosState.data.videos[index]? videosState.data.videos[index].title : "--sin titulo--"}
                                </div>
                            </CellMeasurer>
                            );
                        } }
                        >
                    </List>

                )}
                </AutoSizer>
            </div>

        </div>

    )
}
export default VideosList;