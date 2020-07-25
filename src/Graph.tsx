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
        console.log("rendering Graph"); 
        console.log(this.props);
        return (
            <div
                style = {{
                    background: "#999999",
                    width: 100,
                    height: 100
                }}
            >
                <p> 
                  x { this.props.xlist && this.props.xlist[0] }
                  <br/>
                  y { this.props.ylist }
                </p>
            </div>
        );
    }
};

const mapStateToProps = (state: State) => {var mystate = {
  count: state.xlist.length,
  xlist: state.xlist,
  ylist: state.ylist,
}; console.log(mystate); return mystate;}

export default connect(mapStateToProps)(Graph)

