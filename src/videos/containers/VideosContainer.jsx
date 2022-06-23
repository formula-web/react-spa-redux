import Videos from "../Videos";
import { connect } from 'react-redux'

let stateMap=(state)=>{
    return {
        videos:state.sliceVideos.data.videos
    }
}

const VideosContainer = connect( stateMap )(Videos);
export default VideosContainer;