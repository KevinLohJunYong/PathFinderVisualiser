import React from 'react';
import ReactDOM from 'react-dom';

function Square(props) {
    return (
       <button 
           style={{backgroundColor:"white",width:"40px",height:"40px",fontSize:"large",float:"left"}} 
           onClick={props.onClick}>
          {props.value}
       </button>
    );
 }
class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          squares: this.initGrid()
        };
    }
    initGrid() {
        const grid = Array(612).fill(null);
        grid[293] = 'X';
        grid[318] = 'O';
        return grid;
    }
    renderSquare(i) {
        const square = <Square 
                    value={this.state.squares[i]} 
                    onClick={() => this.state.onClick(i)}/>;
        return square;
     }
     renderSquaresLoop() {
        let squares = [];
        for (let i = 0; i < 17; i++) {
          let columns = [];
          const start = i * 36;
          for (let j = start; j < start + 36; j++) {
            const currSquare = this.renderSquare(j);
            columns.push(currSquare);
          }
          squares.push(<div style={{display:"table"}}>
                         {columns}
                       </div>);
        }
        return squares;
      }  
    render() {
        return (
           <div>
               {this.renderSquaresLoop()}
           </div>
        );
    };
}

export default Grid;