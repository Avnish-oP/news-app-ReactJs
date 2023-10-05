import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<News country='in' category='general' pageSize={20} />} />
            <Route path='/business' element={<News country='in' category='business' pageSize={20} />} />
            <Route path='/technology' element={<News country='in' category='technology' pageSize={20} />} />
            <Route path='/entertainment' element={<News country='in' category='entertainment' pageSize={20} />} />
            <Route path='/science' element={<News country='in' category='science' pageSize={20} />} />
            <Route path='/sports' element={<News country='in' category='sports' pageSize={20} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}