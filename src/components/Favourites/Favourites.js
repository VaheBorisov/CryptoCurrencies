import React, { Component } from "react";
import { withRouter } from "react-router-dom"

import Loading from "../common/Loading"

import "./Favourites.css";

import { API_URL, ths } from "../../config";
import {  renderChangePercent , fetchCurrencies, handleAddFavorite} from "../../helpers";
import { MdFavorite } from 'react-icons/md';


class Favourites extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            favourites: JSON.parse(localStorage.getItem('favouritesList')),
            currencies: [],
        }

    }

    componentDidMount() {
        fetchCurrencies.call(this,`${API_URL}/cryptocurrencies`);
    }

    filteredCurrencies = () => {
        const {currencies, favourites} = this.state;

        return currencies.filter(({id}) => favourites.includes(id)) 
    }

    dontHaveFavourites = () => {
        if (this.filteredCurrencies().length === 0) {
            return <h1 className="NotFound-title">You Don't Have Favorite Currencies</h1>
        }
    }

    render() {

        const { loading} = this.state;

        const { history } = this.props

        return (
            <>

                <h1 className="favorite-title">Favorites <MdFavorite size="30px" color="red" className="heart"/></h1>

                {
                    loading 
                        ? <Loading /> 
                        : this.dontHaveFavourites() 
                            ||
                                <div className="Table-container">
                                    <table className="Table">
                                        <thead className="Table-head">
                                            <tr>
                                                {ths.map((columName, index) => <th key={index}>{columName}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody className="Table-body">
                                        {
                                            this.filteredCurrencies().map(({id, rank, price, name, marketCap, percentChange24h}) => {
                                                return (
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
                                                        <td onClick={() => handleAddFavorite.call(this, id)}>
                                                            <MdFavorite size="25px" color="red"/>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                    
                }
            </>
        )
    }
} 

export default withRouter(Favourites)