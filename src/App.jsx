import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apiKey = '5f243c25cf8d41bda631796791d1d619';
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <LoadingBar
            color="#f56565"
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
            height={3}
          />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey}  country="in" category="general" pageSize={20} />}
            />
            <Route
              path="/business"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey} country="in" category="business" pageSize={20} />}
            />
            <Route
              path="/technology"
              element={
                <News setProgress={this.setProgress} apiKey={this.apiKey} country="in" category="technology" pageSize={20} />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News setProgress={this.setProgress} apiKey={this.apiKey} country="in" category="entertainment" pageSize={20} />
              }
            />
            <Route
              path="/science"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey} country="in" category="science" pageSize={20} />}
            />
            <Route
              path="/sports"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey} country="in" category="sports" pageSize={20} />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
