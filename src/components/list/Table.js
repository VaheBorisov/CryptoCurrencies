import React from 'react';

import "./Table.css"

export default function Table({currencies, ths}) {

    return (
        <div className="Table-container">
            <table className="Table">
                <thead className="Table-head">
                    <tr>
                        {ths.map((columName, index) => <th key={index}>{columName}</th>)}
                    </tr>
                </thead>
                <tbody className="Table-body">
                    {currencies.map(({id,rank, price, marketCap, name, percentChange24h}) => (
                        <tr key={id}>
                            <td>
                                <span className="Table-rank">{rank}</span>
                                {name} 
                            </td>
                            <td>
                                <span className="Table-dollar">$</span>
                                {price}
                            </td>
                            <td>
                                <span className="Table-dollar">$</span>
                                {marketCap}
                            </td>
                            <td>
                                { percentChange24h > 0 
                                    ? <span className="percent-raised">{percentChange24h}% &uarr;</span>
                                    : percentChange24h < 0
                                    ? <span className="percent-fallen">{percentChange24h}% &darr;</span>
                                    : <span>{percentChange24h}</span>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}