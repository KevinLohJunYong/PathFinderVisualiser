const END_ROW = 12;
const END_COL = 40; 
const ROWS = 25;
const COLS = 56;
const visitedNodes = [];
var found = false;

export default function depthFirstSearch(board,row,col,_prevNode) {
    if(found) return [];
     if(row >= ROWS || col >= COLS || row < 0 || col < 0) return [];
     const node = board[row][col];
     if(node.prevNode === null) node.prevNode = _prevNode;
     if(node.isVisited || node.isWall) return [];
     if(row === END_ROW && col === END_COL) {
        found = true;
        return [];
    }
     node.isVisited = true;
     visitedNodes.push(node);
     depthFirstSearch(board,row+1,col,node);
     depthFirstSearch(board,row-1,col,node);
     depthFirstSearch(board,row,col+1,node);
     depthFirstSearch(board,row,col-1,node);
     return visitedNodes;
}