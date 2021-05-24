const STARTING_ROW = 12;
const STARTING_COL = 15;
const END_ROW = 12;
const END_COL = 40; 
const ROWS = 25;
const COLS = 50;
var visitedNodes = [];
var shortestPath = [];
var ans = [];

export default function biDirectionalSearch(board) {
     ans.push(visitedNodes);
     ans.push(shortestPath);
     return ans;
}
function visitNeighbour(board,r,c) {
    if(board[r][c])
}