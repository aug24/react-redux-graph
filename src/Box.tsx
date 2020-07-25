import React from 'react';
import { Dispatch } from './App';
import { connect } from 'react-redux';

type BoxEvent = {
  clientX: number,
  clientY: number
}

export interface PushAction {
  type: "push";
  payload: BoxEvent;
}

interface BoxProps {
  push: (event: BoxEvent) => void;
}

export class Box extends React.Component<BoxProps> {
    render = () => {
        return (
            <div id="box"
                style = {{
                    background: "#ffffff",
                    width: 500,
                    height: 500
                }}
                onClick = {(event) => this.props.push(event)}
            >
test
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {return {
  push: (event: BoxEvent) => dispatch({"type": "push", payload: event })
}}

export default connect(null, mapDispatchToProps)(Box)

