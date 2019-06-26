import React, { Component } from "react";
import "./App.css";
import MainScreen from "./Components/MainScreen";

// REDUCERS
import projects from "./Reducers/projects.reducer";
import likedprojects from "./Reducers/likedprojects.reducer";
import viewonlylike from "./Reducers/viewonlylike.reducer";
import alert from "./Reducers/alert.reducer";

// REDUX
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
const store = createStore(
  combineReducers({ projects, likedprojects, viewonlylike, alert })
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MainScreen />
        </div>
      </Provider>
    );
  }
}

export default App;
