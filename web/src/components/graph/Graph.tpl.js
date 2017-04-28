import React from 'react';
import { CandlestickChart } from 'react-d3';
import styles from './Graph.style.js'

export function GraphTemplate(component) {
    const data = [
        {
            values: component.props.historicalData.map(item => {
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
            {component.props.error &&
                <h3 style={styles.error}>Could not get stock history for {component.props.symbol}</h3>
            }
            {component.props.historicalData.length > 0 &&
                <CandlestickChart
                    data={data}
                    width={800}
                    height={300}
                    hoverAnimation={false}
                    xAxisTickInterval={{ unit: 'week', interval: 1 }}
                    yAxisOffset={-10}
                    fillUp={(value) => '#32CD32'}
                    fillDown={(value) => '#DC143C'}
                    title={"Historical data for " + component.props.symbol}
                />
            }
            <div ref={(element) => { component.bottomOfGraph = element; }}></div>
        </div>
    );
}
