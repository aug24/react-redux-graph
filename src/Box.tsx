import React from 'react';
import type { State } from './State';
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
  targetX: number;
  targetY: number;
  start: number;
}

export class Box extends React.Component<BoxProps> {
    render = () => {
        let target;
        if (this.props.start>0) {
            target=
                <div id="target"
                    style = {{
                        background: "#ff0000",
                        position: "relative",
                        width: 5,
                        height: 5,
                        top: this.props.targetY,
                        left: this.props.targetX
                    }}
                >
                </div>
        } else {
           target =
               <p
                    style = {{
                        color: "#ff0000",
                        margin: "auto"
                    }}
               >
                   Click to start
               </p>
        }
        return (
            <div id="box"
                style = {{
                    background: "#ffffff",
                    width: 500,
                    height: 500
                }}
                onClick = {(event) => this.props.push(event)}
            >
            {target}
            </div>
        );
    }
};

const mapStateToProps = (state: State) => {return {
  targetX: state.targetX,
  targetY: state.targetY,
  start: state.start,
}}

const mapDispatchToProps = (dispatch: Dispatch) => {return {
  push: (event: BoxEvent) => dispatch({"type": "push", payload: event })
}}

export default connect(mapStateToProps, mapDispatchToProps)(Box)

