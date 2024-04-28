import './App.css';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, About, NotFound, Post } from './pages';
import Menu from './Menu'
import Sidebar from './Sidebar'
import Button from './Button'
import Movie from './pages/Movie';


class App extends Component {
  homeMenu = [
    {
      url: "/",
      name: "HOME"
    },
    {
      url: "/about",
      name: "ABOUT"
    },
    {
      url: "/movies",
      name: "MOVIE"
    },
  ]
  state = {
    open: false
  }
  showSidebar = () => {
    this.setState({ open: !this.state.open })
  }
  render(){
    const { open } = this.state
    const { homeMenu } = this
    return (
      <div className="App">
        <Button handleClick={this.showSidebar}>Menu</Button>
        <Sidebar open={open}>
          <Menu menus={homeMenu}></Menu>
        </Sidebar>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route path="/movies" element={<Movie/>}>
            <Route path=":movieId" element={<Movie/>} />
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    );
  }
}

export default App;