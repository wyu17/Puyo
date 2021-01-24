import React from 'react';
import Puyo from './components/Puyo';
import "./App.css";

const App = () => (
  <div className="App">
    <h1 id = "headline"> Puyo Puyo!</h1>
    <Puyo />
  </div>
);

export default App;