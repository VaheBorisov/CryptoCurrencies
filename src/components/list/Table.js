import React from 'react';
import { withRouter } from 'react-router-dom';

import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'

import "./Table.css"

import { renderChangePercent } from '../../helpers'

function Table({currencies, ths, handleAddFavorite, favourites, history}) {

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
                            <td onClick={() => history.push(`/currency/${id}`)}>
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
                                { renderChangePercent(percentChange24h) }
                            </td>

                            <td onClick={() => handleAddFavorite(id)}>
                                
                                {favourites.includes(id) 
                                    ? <MdFavorite size="25px" color="red"/>
                                    : <MdFavoriteBorder size="25px" color="red"/>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default withRouter(Table)