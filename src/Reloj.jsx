import React, { useState, setState } from "react";

class Reloj extends React.Component {
  constructor ( props ) {
    super(props);
    this.state={ hora:"00:00:00" };
  }
  render () {
    return (  <>{this.state.hora}</> );
  }
  tick() {
    const hora = new Date();
    this.setState( {hora: hora.toLocaleTimeString()});
  }


  componentDidMount() {
    //console.log("componentDidMount()");
    //this.setState( {hora:"11:11:11"});
    this.timer1= setInterval(() => this.tick(), 1000 );
  }
}

export default Reloj;