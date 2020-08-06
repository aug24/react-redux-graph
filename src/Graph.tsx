import React from 'react';
import type { State } from './State';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis } from 'recharts';

type GraphProps = {
    count: number;
    xerrorlist: number[];
    yerrorlist: number[];
    rerrorlist: number[];
}

const min = -50
const max = 50
const steps = 20
const stepsize = (max - min) / steps

const restructureData = (input: number[]) => {
    var result = [];
    for (let i=0; i<steps; i++) {
       result.push({ x: input.filter(d => d > min + i * stepsize && d < min + (i+1) * stepsize).length})
    }
    return result;
}

export class Graph extends React.Component<GraphProps> {
    render = () => {
        var xdata = restructureData(this.props.xerrorlist);
        var ydata = restructureData(this.props.yerrorlist);
        return (
            <div
                style = {{
                    background: "#999999",
                    width: 500,
                    height: 200
                }}
            >
              <LineChart
                width={500}
                height={100}
                data={xdata }
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis domain={[min, max]} dataKey="name" />
                <Line 
                  animationDuration={1}
                  type="monotone" 
                  dataKey="x" 
                  stroke="#ffffff" 
                  yAxisId={0} />
              </LineChart>
              <LineChart
                width={500}
                height={100}
                data={ydata }
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis domain={[min, max]} dataKey="name" />
                <Line 
                  animationDuration={1}
                  type="monotone" 
                  dataKey="x" 
                  stroke="#ffffff" 
                  yAxisId={0} />
              </LineChart>
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

