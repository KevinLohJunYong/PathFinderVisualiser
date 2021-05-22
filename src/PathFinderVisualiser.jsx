import React from 'react';
import ReactDOM from 'react-dom';
import Node from './Node/Node.jsx';
import { withStyles } from "@material-ui/core/styles";
import styles from './index.css';
import dijskstra from './Algorithms/dijskstraAlgorithm.js';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);
const STARTING_ROW = 12;
const STARTING_COL = 15;
const END_ROW = 12;
const END_COL = 40; 

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
       for(let r=0;r<25;r++) {
           const row = [];
           for(let c=0;c<56;c++) {
               row.push(this.createNode(r,c));
           }
           grid.push(row);
       }
       this.setState({board:grid});
    }
    createNode(r,c) {
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
    setGrid() {
       return (
         this.state.board.map((row)=>{
                                return (
                                    <div>
                                    {row.map((node)=>{
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
    markVisited(node) {
        document.getElementById(`${node.row}-${node.col}`).className = 'node node-visited';
    }
    shortestPath(finalNode) {
        const shortestPath = [];
        var currNode = finalNode;
        while(currNode.col !== STARTING_COL || currNode.row !== STARTING_ROW) {
           const prevNode = currNode.prevNode;
           const node = {
               ...currNode
           };
           shortestPath.unshift(node);
           currNode = prevNode;
           if(currNode === null) return [];
        }
        return shortestPath;
    }
    visualiseShortestPath() {
        const finalNode = this.state.board[END_ROW][END_COL];
        const shortestPath = this.shortestPath(finalNode);
        if(shortestPath === null) return;
        for(let i=0;i<shortestPath.length;i++) {
            setTimeout(()=>this.markShortestPath(shortestPath[i]),50*i);
        }
    }
    markShortestPath(node) {
        const _board = this.state.board.slice();
        _board[node.row][node.col].isShortestPath = true;
        _board[node.row][node.col].className = 'node node-shortestPath';
        this.setState({board:_board});
    }
    animateDijskstra(visitedNodes) {
        for(let i=0;i<=visitedNodes.length;i++) {
           if(i === visitedNodes.length) {
               setTimeout(()=>this.visualiseShortestPath(),10*i);
           }
           else {
               setTimeout(()=>this.markVisited(visitedNodes[i]),10*i);
           }
        }
    }
    visualiseDijskstra() {
         const visitedNodes = dijskstra(this.state.board);
         visitedNodes.shift();
         this.animateDijskstra(visitedNodes);
    }      
    animateButton(id) {
       document.getElementById(id).style.backgroundColor = "orange";
    }
    deAnimateButton(id) {
        document.getElementById(id).style.backgroundColor = "inherit";
     }
     redirectToGitHub() {
         const gitHubUrl = "https://github.com/KevinLohJunYong/PathFinderVisualiser";
         window.open(gitHubUrl,"_blank");
     }
     clearBoard() {
         const emptyBoard = [];
         this.setState({board:emptyBoard});
         this.componentDidMount();
     }
   render() {
       return (
            <div style={{textAlign:"center"}}>
                <div> 
                <div>
      <AppBar position="static" elevation={0} style={{padding:"10px",paddingLeft:"5px"}}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
              PathFinderVisualiser
          </Typography>
          <div class="dropdown">
            <Button 
              id="visualiseButton" 
              size="large"
              onMouseEnter={()=>this.animateButton("visualiseButton")} 
              onMouseLeave={()=>this.deAnimateButton("visualiseButton")}
              variant="outlined" 
              style={{textTransform:"none"}}> 
               <WhiteTextTypography variant="h6" color="#FFFFFF">
                  Visualise Algorithms
               </WhiteTextTypography>
            </Button>
            <div class="dropdown-content">
             <Button style={{backgroundColor:"white",textTransform:"none"}} 
                     onClick={()=>this.visualiseDijskstra()}
                     onMouseEnter={()=>this.animateButton("visualiseButton")}
                     onMouseLeave={()=>this.deAnimateButton("visualiseButton")}> Dijskstra's Algorithm </Button>
             <Button 
                     style={{backgroundColor:"white",textTransform:"none"}}
                     onMouseEnter={()=>this.animateButton("visualiseButton")}
                     onMouseLeave={()=>this.deAnimateButton("visualiseButton")}> Breath First Search Algorithm </Button>
             <Button 
                    style={{backgroundColor:"white",textTransform:"none"}}
                    onMouseEnter={()=>this.animateButton("visualiseButton")}
                    onMouseLeave={()=>this.deAnimateButton("visualiseButton")}> Depth First Search Algorithm </Button>
             <Button 
                    style={{backgroundColor:"white",textTransform:"none"}}
                    onMouseEnter={()=>this.animateButton("visualiseButton")}
                    onMouseLeave={()=>this.deAnimateButton("visualiseButton")}> A* Search Algorithm </Button>
          </div>
            </div>
            <div>
                <Button 
                    id="clearBoardButton"
                    size="large"
                    style={{textTransform:"none"}}
                    onMouseEnter={()=>this.animateButton("clearBoardButton")} 
                    onMouseLeave={()=>this.deAnimateButton("clearBoardButton")}
                    onClick={()=>this.clearBoard()}> 
                  <WhiteTextTypography variant="h6">
                     Clear Board
                  </WhiteTextTypography>
                </Button>
            </div>
                <div>
                <Button 
                  id="addWallsButton"
                  size="large"
                  style={{textTransform:"none"}} 
                  onMouseEnter={()=>this.animateButton("addWallsButton")} 
                  onMouseLeave={()=>this.deAnimateButton("addWallsButton")}
                  onClick={()=>alert('Click or drag on the board! =))')}> 
                  <WhiteTextTypography variant="h6">
                     Add Walls
                  </WhiteTextTypography>
                </Button>
                </div>
                <div>
                <Button 
                   id="GitHubButton"
                   size="large"
                   style={{textTransform:"none"}} 
                   onMouseEnter={()=>this.animateButton("GitHubButton")} 
                   onMouseLeave={()=>this.deAnimateButton("GitHubButton")}
                   onClick={()=>this.redirectToGitHub()}> 
                  <WhiteTextTypography variant="h6">
                     GitHub
                  </WhiteTextTypography>
                </Button>
                </div>
        </Toolbar>
      </AppBar>
          </div>
                </div>
                <div className={styles.grid}>
                     {this.setGrid()}
                </div>
            </div>
       );
   }
}