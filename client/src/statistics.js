import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries} from 'react-vis';

class Statistics {

    getLineChart(xAxisTitle: string, yAxisTitle: string, data: []) {

        let max = Math.max.apply(Math, data.map(function(obj) { return obj.y; }));

        return (
            <XYPlot
                xType="ordinal"
                width={800}
                height={400}
            yDomain={[0, 2*max]}>
                <XAxis/>
                <YAxis/>
                <VerticalBarSeries data={data}/>
            </XYPlot>
        );
    }
}

export let statistics = new Statistics();