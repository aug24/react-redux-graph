import React from 'react';
import type { State } from './State';
import { connect } from 'react-redux';

type GraphProps = {
    count: number;
    xerrorlist: number[];
    yerrorlist: number[];
    rerrorlist: number[];
}

export class Graph extends React.Component<GraphProps> {
    render = () => {
        return (
            <div
                style = {{
                    background: "#999999",
                    width: 500,
                    height: 200
                }}
            >
                <p> 
                  error 
                  { this.props.xerrorlist.length && Math.trunc(this.props.xerrorlist[this.props.count-1]) }
                  ,
                  { this.props.yerrorlist.length && Math.trunc(this.props.yerrorlist[this.props.count-1]) }
                  ,
                  { this.props.rerrorlist.length && Math.trunc(this.props.rerrorlist[this.props.count-1]) }
                </p>
            </div>
        );
    }
};

const mapStateToProps = (state: State) => {return {
  count: state.xerrorlist.length,
  xerrorlist: state.xerrorlist,
  yerrorlist: state.yerrorlist,
  rerrorlist: state.rerrorlist,
}}

export default connect(mapStateToProps)(Graph)

