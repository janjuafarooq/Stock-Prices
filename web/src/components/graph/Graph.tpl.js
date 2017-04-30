import React from 'react';
import { CandlestickChart } from 'react-d3';
import '../../styles/css/graph.css';

export const GraphTemplate = (component) => {
    const { historicalData, symbol, error } = component.props;
    const data = [
        {
            values: historicalData.map(item => {
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
        <div className="graph">
            {error &&
                <h3 className="error">Could not get stock history for {symbol}</h3>
            }
            {historicalData.length > 0 &&
                <CandlestickChart
                    data={data}
                    width={800}
                    height={300}
                    hoverAnimation={false}
                    xAxisTickInterval={{ unit: 'week', interval: 1 }}
                    yAxisOffset={-10}
                    fillUp={(value) => '#32CD32'}
                    fillDown={(value) => '#DC143C'}
                    title={`Historical data for ${symbol}`}
                />
            }
        </div>
    );
}
