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

function reducers(state: State = {xerrorlist: [], yerrorlist: [], targetX: Math.random() * 500, targetY: Math.random() * 500}, action: Action) {
  switch (action.type) {
    case 'push':
      var xerrorlist=state.xerrorlist;
      var yerrorlist=state.yerrorlist;
      var box = document.getElementById('box')
      var boxPosition = (box && box.getBoundingClientRect()) || {x: 0, y: 0}
      var boxPositionX = boxPosition.x
      var boxPositionY = boxPosition.y
      xerrorlist.push(state.targetX - (action.payload.clientX - boxPositionX))
      yerrorlist.push(state.targetY - (action.payload.clientY - boxPositionY))
      var targetX = Math.random() * 500
      var targetY = Math.random() * 500
      var newstate = { xerrorlist, yerrorlist, targetX, targetY }
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
