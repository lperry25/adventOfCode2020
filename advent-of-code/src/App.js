import React from 'react';
import { Router, Route, Switch } from "react-router";
import './App.css';
import {Day4} from "./days/Day4";
import {Day11} from "./days/Day11";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Day11/>
        </header>
        <Switch>
          <Route path='day4'>
            <Day4/>
          </Route>
          <Route path='day11'>
            <Day4/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
