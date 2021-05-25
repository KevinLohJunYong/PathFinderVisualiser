import React from 'react';
import Node from './Node/Node.jsx';
import { withStyles } from "@material-ui/core/styles";
import styles from './index.css';
import dijskstra from './Algorithms/dijskstraAlgorithm.js';
import bfs from './Algorithms/breathFirstSearch.js';
import dfs from './Algorithms/depthFirstSearch.js';
import aStar from './Algorithms/aStarSearch.js';
import greedyBFS from './Algorithms/GreedyBFS.js';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);
var STARTING_ROW = 12;
var STARTING_COL = 15;
var END_ROW = 12;
var END_COL = 40; 
var ROWS = 25;
var COLS = 56;


export default class PathFinderVisualiser extends React.Component {
    constructor() {
        super();
        this.state = {
            board: [],
            keyPressed: false,
            changeStart: false,
            changeEnd: false
        }
    }
    handleMouseDown(r,c) {
        this.setState({keyPressed:true});
        if(this.state.board[r][c].isStart) {
            this.setState({changeStart:true});
        }
        else if(this.state.board[r][c].isFinish) {
            this.setState({changeEnd:true});
        }
        else if(this.state.changeStart) {
          
        }
        else if(this.state.changeEnd) {
            
        }
        else this.makeWall(r,c);
    }
    handleMouseUp(r,c) {
        this.setState({keyPressed:false});
        if(this.state.changeStart) {
            var newBoard = this.state.board.slice();
            newBoard[STARTING_ROW][STARTING_COL].isStart = false;
            STARTING_ROW = r;
            STARTING_COL = c;
            newBoard[STARTING_ROW][STARTING_COL].isStart = true;
            this.setState({board:newBoard,changeStart:false});
        }
        else if(this.state.changeEnd) {
            var _newBoard = this.state.board.slice();
            _newBoard[END_ROW][END_COL].isFinish = false;
            END_ROW = r;
            END_COL = c;
            _newBoard[END_ROW][END_COL].isFinish = true;
            this.setState({board:_newBoard,changeEnd:false});
        }
    }
    handleMouseEnter(r,c) {
        if(this.state.changeStart || this.state.changeEnd) return;
        if(this.state.keyPressed) this.makeWall(r,c);
    }
    componentDidMount() {
       const grid = [];
       for(let r=0;r<ROWS;r++) {
           const row = [];
           for(let c=0;c<COLS;c++) {
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
                                                onMouseUp = {(row,col) => this.handleMouseUp(row,col)}>
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
    animateAlgo(visitedNodes) {
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
         const visitedNodes = dijskstra(this.state.board,STARTING_ROW,STARTING_COL,END_ROW,END_COL);
         visitedNodes.shift();
         this.animateAlgo(visitedNodes);
    }      
    visualiseAStar() {
        const visitedNodes = aStar(this.state.board,STARTING_ROW,STARTING_COL,END_ROW,END_COL);
        visitedNodes.shift();
        this.animateAlgo(visitedNodes);
   }   
   visualiseGreedyBFS() {
    const visitedNodes = greedyBFS(this.state.board,STARTING_ROW,STARTING_COL,END_ROW,END_COL);
    visitedNodes.shift();
    this.animateAlgo(visitedNodes);
   }
   verifyCleanSlate(board) {
       for(let r=0;r<ROWS;r++) {
           for(let c=0;c>COLS;c++) {
               if(board[r][c].isVisited) alert('visited error');
               if(board[r][c].isShortestPath) alert('shortest path error');
           }
       }
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
        window.location.reload();
     }
     clearPath() {
         const _board = [];
         for(let r=0;r<ROWS;r++) {
             const rows = [];
             for(let c=0;c<COLS;c++) {
                const node = this.state.board[r][c];
                const newNode = {
                   row: node.row,
                   col: node.col,
                   isStart: node.isStart,
                   isFinish: node.isFinish,
                   isWall: node.isWall,
                   prevNode: null,
                   distance: Infinity,
                   isVisited: false,
                   isShortestPath: false,
                };
                rows.push(newNode);
             }
             _board.push(rows);
         }
         this.setState({board:_board});
        }
     visualiseBFS() {
        const visitedNodes = bfs(this.state.board,STARTING_ROW,STARTING_COL,END_ROW,END_COL);
        visitedNodes.shift();
        this.animateAlgo(visitedNodes);
     }  
     visualiseDFS() {
        const visitedNodes = dfs(this.state.board,STARTING_ROW,STARTING_COL,null,STARTING_ROW,STARTING_COL,END_ROW,END_COL);
        visitedNodes.shift();
        this.animateAlgo(visitedNodes);
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
             <Button 
                     id="dijskstraAlgoButton"
                     size="large"
                     style={{backgroundColor:"white",textTransform:"none"}} 
                     onClick={()=>this.visualiseDijskstra()}
                     onMouseEnter={()=>this.animateButton("dijskstraAlgoButton")}
                     onMouseLeave={()=>this.deAnimateButton("dijskstraAlgoButton")}> Dijskstra's Algorithm </Button>
             <Button 
                     id="bfsAlgoButton"
                     style={{backgroundColor:"white",textTransform:"none"}}
                     onClick={()=>this.visualiseBFS()}
                     onMouseEnter={()=>this.animateButton("bfsAlgoButton")}
                     onMouseLeave={()=>this.deAnimateButton("bfsAlgoButton")}> Breath First Search </Button>
             <Button 
                    id="dfsAlgoButton"
                    style={{backgroundColor:"white",textTransform:"none"}}
                    onClick={()=>this.visualiseDFS()}
                    onMouseEnter={()=>this.animateButton("dfsAlgoButton")}
                    onMouseLeave={()=>this.deAnimateButton("dfsAlgoButton")}> Depth First Search </Button>
             <Button 
                    id="A*SearchAlgoButton"
                    size="large"
                    style={{backgroundColor:"white",textTransform:"none"}}
                    onClick={()=>this.visualiseAStar()} 
                    onMouseEnter={()=>this.animateButton("A*SearchAlgoButton")}
                    onMouseLeave={()=>this.deAnimateButton("A*SearchAlgoButton")}> A* Search </Button>
            <Button 
                    id="GreedyBFSButton"
                    size="large"
                    style={{backgroundColor:"white",textTransform:"none"}}
                    onClick={()=>this.visualiseGreedyBFS()} 
                    onMouseEnter={()=>this.animateButton("GreedyBFSButton")}
                    onMouseLeave={()=>this.deAnimateButton("GreedyBFSButton")}> Greedy BFS </Button>
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
                    id="clearPathButton"
                    size="large"
                    style={{textTransform:"none"}}
                    onMouseEnter={()=>this.animateButton("clearPathButton")} 
                    onMouseLeave={()=>this.deAnimateButton("clearPathButton")}
                    onClick={()=>this.clearPath()}> 
                  <WhiteTextTypography variant="h6">
                     Clear Path
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
                     View Source Code
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
