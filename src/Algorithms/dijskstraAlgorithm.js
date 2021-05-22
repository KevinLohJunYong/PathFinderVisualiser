//return visited nodes order
export default function dijskstraAlgorithm(board) {
    const STARTING_ROW = 10;
    const STARTING_COL = 15;
    const END_ROW = 10;
    const END_COL = 35; 
    const visitedNodes = [];
    const nodes = getAllNodes(board);
    board[STARTING_ROW][STARTING_COL].distance = 0;
    while(nodes.length > 0) {
          sort(nodes);
          const closestNode = nodes.shift();
          if(closestNode.isVisited) continue;
          if(closestNode.distance === Infinity) return [];
          if(closestNode.row === END_ROW && closestNode.col === END_COL) return visitedNodes;
          visitedNodes.push(closestNode);
          closestNode.isVisited = true;
          updateNeighbours(nodes,closestNode,board);
    }
    return [];
}
function updateNeighbours(nodes,node,board) {
    const ROWS = 20;
    const COLS = 50;
    if(node.row+1 < ROWS) {
        var nxtNode = board[node.row+1][node.col];
        if(!nxtNode.isVisited) {
        nxtNode.distance = node.distance+1;
        nxtNode.prevNode = node;
        }
    }
    if(node.row-1 >= 0) {
        var _nxtNode = board[node.row-1][node.col];
        if(!_nxtNode.isVisited) {
        _nxtNode.distance = node.distance+1;
        _nxtNode.prevNode = node;
        }
    }
    if(node.col+1 < COLS) {
        var __nxtNode = board[node.row][node.col+1];
        if(!__nxtNode.isVisited) {
        __nxtNode.distance = node.distance+1;
        __nxtNode.prevNode = node;
        }
    }
    if(node.col-1 >= 0) {
        var ___nxtNode = board[node.row][node.col-1];
        if(!___nxtNode.isVisited) {
        ___nxtNode.distance = node.distance+1;
        ___nxtNode.prevNode = node;
        }
    }
}
function sort(nodes) {
    nodes.sort((a, b) => a.distance - b.distance);
}
function getAllNodes(board) {
    const nodes = [];
    for(const row of board) {
        for(const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}