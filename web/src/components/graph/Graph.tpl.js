import React from 'react';
import { CandlestickChart } from 'react-d3';

export function GraphTemplate(component) {
    const data = {
        values: []
    };

    data.values = component.state.historicalData.map(item => {
        return { x: new Date(item.date), open: item.open, high: item.high, low: item.low, close: item.close };
    });

    let ohlcData = [];

    if (data.values.length > 0) {
        ohlcData = [
            {
                values: data.values
            }
        ];
    }

    return (
        <div className="row">
            <CandlestickChart
                data={ohlcData}
                width={500}
                height={400}
                xAxisTickInterval={{ unit: 'month', interval: 1 }}
                yAxisOffset={-10}
                title={"Historical data for " + component.state.symbol}
            />
        </div>
    );
}
