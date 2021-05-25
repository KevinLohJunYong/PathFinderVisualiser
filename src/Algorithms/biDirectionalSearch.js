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
     reset(board);
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
         board[r][c].isVisited = true;
         visitedNodes.push(board[r][c]);
         board[r][c].prevNode = board[prevR][prevC];
         findShortestPath(board,board[prevR][prevC],board[r][c]);
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
function findShortestPath(board,prevNode,currNode) {
    var path1 = [];
    var path2 = [];
    var prevR = prevNode.row;
    var prevC = prevNode.col;
    var currR = currNode.row;
    var currC = currNode.col;
    while(prevR !== STARTING_ROW || prevC !== STARTING_COL) {
         path1.unshift(board[prevR][prevC]);
         var _prevNode = board[prevR][prevC].prevNode;
         if(_prevNode === null) break;
         prevR = _prevNode.row;
         prevC = _prevNode.col;
    }
    while(currR !== END_ROW || currC !== END_COL) {
         path2.push(board[currR][currC]);
         var previousNode = board[currR][currC].prevNode;
         if(previousNode === null) break;
         currR = previousNode.row;
         currC = previousNode.col;
    }
    path1.concat(path2);
    return path1; 
}
function reset(board) {
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