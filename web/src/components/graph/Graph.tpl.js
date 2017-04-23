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
        <div className="row">
            {component.state.historicalData.length > 0 &&
                <CandlestickChart
                    data={data}
                    width={1000}
                    height={500}
                    xAxisTickInterval={{ unit: 'month', interval: 1 }}
                    yAxisOffset={-10}
                    fillUp={(value) => '#32CD32'}
                    fillDown={(value) => '#DC143C'}
                    title={"Historical data for " + component.state.symbol}
                />
            }
        </div>
    );
}
