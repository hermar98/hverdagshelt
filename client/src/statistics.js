import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries} from 'react-vis';

class Statistics {

    getLineChart(xAxisTitle: string, yAxisTitle: string, data: []) {

        return (
            <XYPlot
                xType="ordinal"
                width={1000}
                height={500}>
                <XAxis/>
                <YAxis/>
                <VerticalBarSeries data={data}/>
            </XYPlot>
        );
    }
}

export let statistics = new Statistics();