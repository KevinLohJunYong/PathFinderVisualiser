const ROWS = 25;
const COLS = 56;
var visitedNodes = [];
var found = false;

export default function depthFirstSearch(board,row,col,_prevNode,STARTING_ROW,STARTING_COL,END_ROW,END_COL) {
    if(_prevNode === null) {
        found = false;
        visitedNodes = [];
    }
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
     depthFirstSearch(board,row-1,col,node,STARTING_ROW,STARTING_COL,END_ROW,END_COL);
     depthFirstSearch(board,row+1,col,node,STARTING_ROW,STARTING_COL,END_ROW,END_COL);
     depthFirstSearch(board,row,col+1,node,STARTING_ROW,STARTING_COL,END_ROW,END_COL);
     depthFirstSearch(board,row,col-1,node,STARTING_ROW,STARTING_COL,END_ROW,END_COL);
     return visitedNodes;
}