import React from 'react';
import { CandlestickChart } from 'react-d3';

export function GraphTemplate(component) {
    const data = [
        {
            values: component.state.historicalData.map(item => {
                return {
                    x: new Date(item.date),
                    open: item.open,
                    high: item.high,
                    low: item.low,
                    close: item.close
                };
            })
        }
    ];

    return (
        <div>
            {component.state.historicalData.length > 0 &&
                <CandlestickChart
                    data={data}
                    width={800}
                    height={300}
                    xAxisTickInterval={{ unit: 'week', interval: 1 }}
                    yAxisOffset={-10}
                    fillUp={(value) => '#32CD32'}
                    fillDown={(value) => '#DC143C'}
                    title={"Historical data for " + component.state.symbol}
                />
            }
            <div ref={(element) => { component.bottomOfGraph = element; }}></div>
        </div>
    );
}
