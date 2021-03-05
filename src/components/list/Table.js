import React, {Component} from 'react';

import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'

import "./Table.css"

export default class Table extends Component {

    constructor(props) {
        super(props)
        this.state = {
            favourites: JSON.parse(localStorage.getItem('favouritesList')) || []
        }
    }

    handleAddFavorite = (id) => {
        
        if (this.state.favourites.length === 0 || !this.state.favourites.includes(id)) {
            const favoriteList = [...this.state.favourites, id];
            localStorage.setItem('favouritesList', JSON.stringify(favoriteList) );
        };
        
        let favourites = JSON.parse(localStorage.getItem('favouritesList'));
        if (this.state.favourites.includes(id)) favourites.splice(this.state.favourites.indexOf(id), 1);
        localStorage.setItem('favouritesList', JSON.stringify(favourites));
        this.setState({
            favourites
        });
    };


    render() {

        const {currencies, ths} = this.props;
    
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
    
                                <td onClick={() => this.handleAddFavorite(id)}>
                                    
                                    {this.state.favourites.includes(id) 
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
    }
}