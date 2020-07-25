import React from 'react';
import type { State } from './State';
import { connect } from 'react-redux';

type GraphProps = {
    count: number;
    xlist: number[];
    ylist: number[];
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
                  x { this.props.xlist && this.props.xlist[this.props.count-1] }
                  <br/>
                  y { this.props.ylist && this.props.ylist[this.props.count-1] }
                </p>
            </div>
        );
    }
};

const mapStateToProps = (state: State) => {return {
  count: state.xlist.length,
  xlist: state.xlist,
  ylist: state.ylist,
}}

export default connect(mapStateToProps)(Graph)

