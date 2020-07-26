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

var initialState: State = {
  xerrorlist: [],
  yerrorlist: [],
  rerrorlist: [],
  targetX: Math.random() * 500,
  targetY: Math.random() * 500,
  start: 0,
  maxDelay: 1500
}

function reducers(state: State = initialState,
  action: Action) {
  switch (action.type) {
    case 'push':
      var newStart = Date.now();
      var delay = newStart - state.start;
      var fastEnoughToInclude = delay <= state.maxDelay;
      if (state.start>0) {
        var xerrorlist=state.xerrorlist;
        var yerrorlist=state.yerrorlist;
        var rerrorlist=state.rerrorlist;

        var box = document.getElementById('box')
        var boxPosition = (box && box.getBoundingClientRect()) || {x: 0, y: 0}

        var boxPositionX = boxPosition.x
        var xerror = state.targetX - (action.payload.clientX - boxPositionX)
        if (fastEnoughToInclude)
          xerrorlist.push(xerror)

        var boxPositionY = boxPosition.y
        var yerror = state.targetY - (action.payload.clientY - boxPositionY)
        if (fastEnoughToInclude)
          yerrorlist.push(yerror)

        var rerror = Math.sqrt(xerror * xerror + yerror * yerror)
        if (fastEnoughToInclude)
          rerrorlist.push(rerror)

        var targetX = Math.random() * 500
        var targetY = Math.random() * 500
        var newstate = { ...state, xerrorlist, yerrorlist, rerrorlist, targetX, targetY, start: newStart }
        return newstate;
      } else {
        return { ...state, start: newStart };
      }
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
