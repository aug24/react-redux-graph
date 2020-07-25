import React from 'react';
import Box from './Box';
import Graph from './Graph';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { PushAction } from './Box'
import { ThunkDispatch } from 'redux-thunk';
import { State } from './State';

type Action = PushAction

function reducers(state: State = {xlist: [], ylist: [], targetX: 250, targetY: 250}, action: Action) {
  switch (action.type) {
    case 'push':
      var xlist=state.xlist;
      var ylist=state.ylist;
      var box = document.getElementById('box')
      var boxPosition = (box && box.getBoundingClientRect()) || {x: 0, y: 0}
      var boxPositionX = boxPosition.x
      var boxPositionY = boxPosition.y
      xlist.push(action.payload.clientX - boxPositionX)
      ylist.push(action.payload.clientY - boxPositionY)
      var targetX = Math.random() * 500
      var targetY = Math.random() * 500
      var newstate = { xlist, ylist, targetX, targetY }
      return newstate;
    default:
      return state
  }
}

const store = createStore(reducers)

export type Dispatch = ThunkDispatch<State, void, Action>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
          <Box key="box"/>
          <Graph key="graph"/>
        </Provider>
      </header>
    </div>
  );
}

export default App;
