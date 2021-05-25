const STARTING_ROW = 12;
const STARTING_COL = 15;
const END_ROW = 12;
const END_COL = 40; 
const ROWS = 25;
const COLS = 50;

export default function breathFirstSearch(board,STARTING_ROW,STARTING_COL,END_ROW,END_COL) {
    const visitedNodes = [];
    const queue = [];
    const currNode = board[STARTING_ROW][STARTING_COL];
    queue.push(currNode);
    while(queue.length > 0) {
        const node = queue.shift();
        if(node.row === END_ROW && node.col === END_COL) return visitedNodes;
        if(node.isWall || node.isVisited) continue;
        visitedNodes.push(node);
        node.isVisited = true;
        addNeighbours(queue,node,board);
    }
    return visitedNodes;
}
function addNeighbours(queue,node,board) {
    if(node.row+1 < ROWS) {
        const newNode = board[node.row+1][node.col];
        if(!newNode.isVisited) {
            queue.push(newNode);
            newNode.prevNode = node;
        }
    }
    if(node.row-1 >= 0) {
        const newNode = board[node.row-1][node.col];
        if(!newNode.isVisited) {
            queue.push(newNode);
            newNode.prevNode = node;
        }
    }
    if(node.col+1 < COLS) {
        const newNode = board[node.row][node.col+1];
        if(!newNode.isVisited) {
            queue.push(newNode);
            newNode.prevNode = node;
        }
    }
    if(node.col-1 >= 0) {
        const newNode = board[node.row][node.col-1];
        if(!newNode.isVisited) {
            queue.push(newNode);
            newNode.prevNode = node;
        }
    }
}