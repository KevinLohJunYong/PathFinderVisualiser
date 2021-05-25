const ROWS = 25;
const COLS = 56;
var visitedNodes = [];
const START_G = 0;
const START_H = 25;
const START_F = START_G + START_H;
var gArr = [];
var _END_ROW = -1;
var _END_COL = -1;

export default function aStartSearch(board,STARTING_ROW,STARTING_COL,END_ROW,END_COL) {
     _END_ROW = END_ROW;
     _END_COL = END_COL;
     gArr = [];
     visitedNodes = [];
     const startNode = {
         row: STARTING_ROW,
         col: STARTING_COL,
         g: START_G,
         h: START_H,
         f: START_F
     };
     initGArr();
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
    const deltaG = findDeltaG(node.row,node.col,r,c);
    const newNode = {
       row: r,
       col: c,
       g: node.g + deltaG,
       h: findH(r,c),
       f: node.g + deltaG + findH(r,c)
    };
    if(board[r][c].isWall) return;
    if(gArr[r][c] <= newNode.g) return;
    gArr[r][c] = newNode.g;
    board[r][c].prevNode = board[node.row][node.col];
    nodes.push(newNode);
}
function findH(r,c) {
    return Math.abs(_END_ROW-r) + Math.abs(_END_COL-c);
}
function findDeltaG(r,c,_r,_c) {
    return Math.sqrt(Math.pow(r-_r,2)+Math.pow(c-_c,2));
}
function initGArr() {
    for(let r=0;r<ROWS;r++) {
        const rows = [];
        for(let c=0;c<COLS;c++) {
             rows.push(Infinity);
        }
        gArr.push(rows);
    }
    gArr[0][0] = 0;
}
