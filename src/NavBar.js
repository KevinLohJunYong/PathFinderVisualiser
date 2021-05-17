import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import styles from './index.css';

class NavBar extends React.Component {
    handleClick() {

    }
    render() {
        return (
          <div id ="navBarDiv" class="navBarDiv">
           <a href="#home">PathFinderVisualiser</a>
             <div class="dropdown">
              <button class="dropbtn"> Algorithms </button> 
          <div class="dropdown-content">
             <Button> Dijskstra's Algorithm </Button>
             <Button> Breath First Search Algorithm </Button>
             <Button> Depth First Search Algorithm </Button>
          </div>
          </div>
          <button class="btn"> Maze </button> 
           <button class="btn"> Visualise </button>
           <button class="btn"> Add Walls </button> 
           <button class="btn"> Add Bombs </button> 
           <button class="btn"> Clear Board </button> 
        </div>
        );
    }
}

export default NavBar;