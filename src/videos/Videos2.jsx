//Videos2.jsx

import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { videos: state.data.videos };
};

const ConnectedList = ({ videos }) => (
  <ul>
    {videos.map(el => (
      <li key={el.id}>{el.title}</li>
    ))}
  </ul>
);

const Videos2 = connect(mapStateToProps)(ConnectedList);

export default Videos2;
