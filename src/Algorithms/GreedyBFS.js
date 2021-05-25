const ROWS = 25;
const COLS = 56;
var visitedNodes = [];
const START_F = 25;
var end_row = -1;
var end_col = -1;

export default function GreedyBFS(board,STARTING_ROW,STARTING_COL,END_ROW,END_COL) {
    end_row = END_ROW;
    end_col = END_COL;
     visitedNodes = [];
     const startNode = {
         row: STARTING_ROW,
         col: STARTING_COL,
         f: START_F
     };
     const nodes = [];
     nodes.push(startNode);
     while(nodes.length > 0) {
         sort(nodes);
         const node = nodes.shift();
         if(board[node.row][node.col].isVisited) continue;
         if(node.row === END_ROW && node.col === END_COL) return visitedNodes;
         visitedNodes.push(node);
         board[node.row][node.col].isVisited = true;
         addNeighbours(node,nodes,board);
     }
     return visitedNodes;
}
function sort(nodes) {
    nodes.sort((a,b) => a.f-b.f);
}
function addNeighbours(node,nodes,board) {
    addNeighbour(node,nodes,board,node.row,node.col+1);
    addNeighbour(node,nodes,board,node.row-1,node.col);
    addNeighbour(node,nodes,board,node.row,node.col-1);
    addNeighbour(node,nodes,board,node.row+1,node.col);
}
function addNeighbour(node,nodes,board,r,c) {
    if(r < 0 || c < 0 || r >= ROWS || c >= COLS) return;
    const newNode = {
       row: r,
       col: c,
       f: findH(r,c)
    };
    if(board[r][c].isWall || board[r][c].isVisited) return;
    board[r][c].prevNode = board[node.row][node.col];
    nodes.push(newNode);
}
function findH(r,c) {
    return Math.abs(end_row-r) + Math.abs(end_col-c);
}

