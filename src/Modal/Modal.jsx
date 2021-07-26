import React from "react";

export default class Modal extends React.Component {
  render() {
    if(!this.props.show){
        return null;
    }
    return (
       <div style={{marginLeft: "20%"}}>
           <h2> Welcome to my pathfinder visualiser app! </h2>
           <h2> Given two nodes, can we find a path between them, taking into account obstacles ? </h2>
           <h2> 1. Click on the button labeled "Visualise Algorithms" to visualise the different algorithms! </h2>
           <h2> 2. You can customise the positions of the starting and end nodes by dragging them. </h2> 
           <h2> 3. You can also add walls by dragging on the board. </h2>
           <h2> I hope you have as much fun playing with the app as I did designing it! :D </h2>
        </div>
    );
  }
}