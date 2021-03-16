import React from 'react';
import { withRouter } from 'react-router-dom';

import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'

import "./Table.css"

import { renderChangePercent } from '../../helpers'

function Table({currencies, onFavoriteClick, favorites, history}) {

    // const favoritesIDs = favorites.map(item => item.id)

    return (
        <div className="Table-container">
            <table className="Table">
                <thead className="Table-head">
                    <tr>
                        <th>Cryptocurrency</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>24H Change</th>
                        <th>Favorites </th>
                    </tr>
                </thead>
                <tbody className="Table-body">
                    {currencies.map( currency => (
                        <tr key={currency.id} onClick={() => history.push(`/currency/${currency.id}`)}>
                            <td>
                                <span className="Table-rank">{currency.rank}</span>
                                {currency.name} 
                            </td>
                            <td>
                                <span className="Table-dollar">$</span>
                                {currency.price}
                            </td>
                            <td>
                                <span className="Table-dollar">$</span>
                                {currency.marketCap}
                            </td>
                            <td>
                                { renderChangePercent(currency.percentChange24h) }
                            </td>

                            <td onClick={event => onFavoriteClick(event , currency)} >
                                
                                {
                                    favorites.includes(currency.id)
                                    ? <MdFavorite size="25px" color="red"/>
                                    : <MdFavoriteBorder size="25px" color="red"/>
                                }
                                {/* {
                                    console.log(favorites, currency)
                                } */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default withRouter(Table)