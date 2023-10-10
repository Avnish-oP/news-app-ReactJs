import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const apiKey = '28247126569d4cd0a60954ebbe0793c9';

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <div className="App">
      <Router>
        <LoadingBar
          color="#f56565"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          height={3}
        />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<News setProgress={setProgress} apiKey={apiKey}  country="in" category="general" pageSize={20} />}
          />
          <Route
            path="/business"
            element={<News setProgress={setProgress} apiKey={apiKey} country="in" category="business" pageSize={20} />}
          />
          <Route
            path="/technology"
            element={<News setProgress={setProgress} apiKey={apiKey} country="in" category="technology" pageSize={20} />}
          />
          <Route
            path="/entertainment"
            element={<News setProgress={setProgress} apiKey={apiKey} country="in" category="entertainment" pageSize={20} />}
          />
          <Route
            path="/science"
            element={<News setProgress={setProgress} apiKey={apiKey} country="in" category="science" pageSize={20} />}
          />
          <Route
            path="/sports"
            element={<News setProgress={setProgress} apiKey={apiKey} country="in" category="sports" pageSize={20} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
