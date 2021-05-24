const STARTING_ROW = 12;
const STARTING_COL = 15;
const END_ROW = 12;
const END_COL = 40; 
const ROWS = 25;
const COLS = 50;
const visitedNodes = [];
const START_G = 0;
const START_H = 25;
const START_F = START_G + START_H;

export default function aStartSearch(board) {
     const startNode = {
         row: STARTING_ROW,
         col: STARTING_COL,
         g: START_G,
         h: START_H,
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
     return [];
}
function sort(nodes) {
    nodes.sort((a,b) => a.f-b.f);
}
function addNeighbours(node,nodes,board) {
    for(var r=Math.max(0,node.row-1);r<=Math.min(ROWS-1,node.row+1);r++) {
        for(var c=Math.max(0,node.col-1);c<=Math.min(COLS-1,node.col+1);c++) {
            const deltaG = findDeltaG(node.row,node.col,r,c);
            const deltaH = findDeltaH(node.row,node.col,r,c);
            const newNode = {
               row: r,
               col: c,
               g: node.g + deltaG,
               h: node.h - deltaH,
               f: node.g + deltaG + node.h - deltaH
            };
            if(board[r][c].isWall || board[r][c].isVisited) continue;
            board[r][c].prevNode = board[node.row][node.col];
            nodes.push(newNode);
        }
    }
}
function findDeltaG(r,c,_r,_c) {
    return Math.sqrt(Math.pow(r-_r,2)+Math.pow(c-_c,2));
}
function findDeltaH(r,c,_r,_c) {
   const deltaX = Math.abs(r-_r);
   const deltaY = Math.abs(c-_c);
   return deltaX + deltaY;
}