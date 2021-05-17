import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar.js';
import Grid from './Grid.js';

class PathFinderVisualiser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        }
    }
    render() {
        return (
            <div>
             <NavBar> </NavBar>
             <Grid> 
             </Grid>
            </div>
        );
    }
}

export default PathFinderVisualiser;