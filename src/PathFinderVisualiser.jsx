import React from 'react';
import ReactDOM from 'react-dom';
import Node from './Node/Node.jsx';
import styles from './index.css';

export default class PathFinderVisualiser extends React.Component {
    constructor() {
        super();
        this.state = {
            board: [],
            keyPressed : false
        }
    }
    handleMouseDown(r,c) {
        this.setState({keyPressed:true});
        this.makeWall(r,c);
    }
    handleMouseUp() {
        this.setState({keyPressed:false});
    }
    handleMouseEnter(r,c) {
        if(this.state.keyPressed) this.makeWall(r,c);
    }
    componentDidMount() {
       const grid = [];
       for(let r=0;r<20;r++) {
           const row = [];
           for(let c=0;c<50;c++) {
               row.push(this.createNode(r,c));
           }
           grid.push(row);
       }
       this.setState({board:grid});
    }
    createNode(r,c) {
        const STARTING_ROW = 10;
        const STARTING_COL = 15;
        const END_ROW = 10;
        const END_COL = 35; 
        const node = {
           isWall: false,
           isVisited: false,
           isShortestPath: false,
           isStart: (r === STARTING_ROW && c === STARTING_COL) ? true : false,
           isFinish: (r === END_ROW && c === END_COL) ? true : false,
           prevNode: null,
           distance: Infinity,
           row: r,
           col: c,
        };
        return node;
    }
    handleClick() {
        alert('hi');
    }
    makeWall(r,c) {
       const _board = this.state.board.slice();
       const node = _board[r][c];
       const newNode = {
           ...node,
           isWall:!node.isWall
       };
       _board[r][c] = newNode;
       this.setState({board:_board});
    }
    initGrid() {
       return (
         this.state.board.map((row,rowIdx)=>{
                                return (
                                    <div>
                                    {row.map((node,nodeIdx)=>{
                                    const {isWall,isVisited,isShortestPath,isStart,isFinish,prevNode,distance,row,col} = node;
                                        return ( 
                                             <Node
                                                id = {`${row}-${col}`}
                                                isWall = {isWall}
                                                isVisited = {isVisited}
                                                isShortestPath = {isShortestPath}
                                                isStart = {isStart}
                                                isFinish = {isFinish}
                                                prevNode = {prevNode}
                                                distance = {distance}
                                                row = {row}
                                                col = {col}
                                                onMouseDown = {(row,col) => this.handleMouseDown(row,col)}
                                                onMouseEnter = {(row,col) => this.handleMouseEnter(row,col)}
                                                onMouseUp = {() => this.handleMouseUp()}>
                                             </Node>
                                        );
                                    })}
                                    </div>
                                );
                            })
       );
    }
   render() {
       return (
            <div style={{textAlign:"center"}}>
                <div>
                    <button onClick={()=>this.handleClick()} style={{marginBottom:"50px"}}> Visualise </button>
                </div>
                <div className={styles.grid}>
                     {this.initGrid()}
                </div>
            </div>
       );
   }
}
