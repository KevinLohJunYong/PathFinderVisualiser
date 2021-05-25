import './NodeStyles.css';
import React, {Component} from 'react';

export default class Node extends Component {
    render() {
        const {
            isWall,
            isVisited,
            isShortestPath,
            isStart,
            isFinish,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            row,
            col,
        } = this.props;
        const _className = isStart ? 'node-start' 
         : isFinish ? 'node-finish' : isWall ? 'node-wall' 
         : isShortestPath ? 'node-shortestPath' : isVisited ? 'node-visited' : '';
        return (
           <div 
            id={`${row}-${col}`}
            className={`node ${_className}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp(row,col)}
            ></div>
        );
    };
}