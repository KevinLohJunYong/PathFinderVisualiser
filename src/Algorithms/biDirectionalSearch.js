const STARTING_ROW = 12;
const STARTING_COL = 15;
const END_ROW = 12;
const END_COL = 40; 
const ROWS = 25;
const COLS = 56;
var visitedNodes = [];
var shortestPath = [];
var ans = [];
var nodesLeft = [];
var nodesRight = [];
var visitStatus = [];
var done = false;


export default function biDirectionalSearch(board) {
     init(board);
     for(let i=0;!done&&nodesRight.length>0&&nodesLeft.length>0;i++) {
         var currNodeLeft = nodesLeft.shift();
         var currNodeRight = nodesRight.shift();
         visitedNodes.push(currNodeLeft);
         visitedNodes.push(currNodeRight);
         if(board[currNodeLeft.row][currNodeLeft.col].isVisited) continue;
         if(board[currNodeRight.row][currNodeRight.col].isVisited) continue;
         board[currNodeLeft.row][currNodeLeft.col].isVisited = true;
         board[currNodeRight.row][currNodeRight.col].isVisited = true;
     visitNeighbour(board,
        currNodeLeft.row-1,currNodeLeft.col,currNodeLeft.row,currNodeLeft.col,1);
     visitNeighbour(board,
        currNodeRight.row-1,currNodeRight.col,currNodeRight.row,currNodeRight.col,-1);
            visitNeighbour(board,
                currNodeLeft.row,currNodeLeft.col+1,currNodeLeft.row,currNodeLeft.col,1);
            visitNeighbour(board,
                currNodeRight.row,currNodeRight.col+1,currNodeRight.row,currNodeRight.col,-1);
            visitNeighbour(board,
                currNodeLeft.row+1,currNodeLeft.col,currNodeLeft.row,currNodeLeft.col,1);
            visitNeighbour(board,
                currNodeRight.row+1,currNodeRight.col,currNodeRight.row,currNodeRight.col,-1);
            visitNeighbour(board,
                currNodeLeft.row,currNodeLeft.col-1,currNodeLeft.row,currNodeLeft.col,1);
            visitNeighbour(board,
                currNodeRight.row,currNodeRight.col-1,currNodeRight.row,currNodeRight.col,-1);
     }
     ans.push(visitedNodes);
     ans.push(shortestPath);
     return ans;
}
function visitNeighbour(board,r,c,prevR,prevC,isLeft) {
    if(r < 0 || c < 0 || r >= ROWS || c >= COLS) return;
    if(board[r][c].isWall) return;
    if(board[r][c].isVisited) return;
    if(isLeft + visitStatus[r][c] === 0) {
         done = true;
         visitedNodes.push(board[r][c]);
         board[r][c].prevNode = board[prevR][prevC];
         findShortestPath(board);
         return;
    }
    visitStatus[r][c] = isLeft;
    board[r][c].prevNode = board[prevR][prevC];
    if(isLeft === 1) {
        nodesLeft.push(board[r][c]);
    }
    if(isLeft === -1) {
        nodesRight.push(board[r][c]);
    }
}
function findShortestPath(board) {
    var node = board[END_ROW][END_COL];
    while(node.row !== STARTING_ROW || node.col !== STARTING_COL) {
        var prevNode = node.prevNode;
        const _node = {
            ...node
        };
        shortestPath.unshift(_node);
        node = prevNode;
    }
}
function init(board) {
    visitedNodes = [];
    shortestPath = [];
    ans = [];
    nodesLeft = [];
    nodesRight = [];
    visitStatus = [];
    done = false;
    for(var r=0;r<ROWS;r++) {
        var row = [];
        for(var c=0;c<COLS;c++) {
           row.push(100);
        }
        visitStatus.push(row);
    }
    nodesLeft.push(board[STARTING_ROW][STARTING_COL]);
    nodesRight.push(board[END_ROW][END_COL]);
}