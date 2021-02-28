import React, {Component} from "react";

import Loading from "../common/Loading"

import "./List.css";

export default class List extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            currencies: [],
            ths: ["Cryptocurrency" , "Price" , "Market Cap" , "24H Change"]
        }

    };

    componentDidMount() {
        fetch("https://api.udilia.com/coins/v1/cryptocurrencies?page=1&perPage=20")
            .then(response => response.json())
            .then(({currencies}) => {
                this.setState({
                    currencies,
                    loading: false 
                })
            })
    }

    render() {
        const {loading, ths, currencies} = this.state

        if(loading) {
            return <div className="loading-container">
                <Loading />
            </div>
        }
        
        return (
            <div className="Table-container">
                <table className="Table">
                    <thead className="Table-head">
                        <tr>
                            {ths.map((th, index) => <th key={index}>{th}</th>)}
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
        );
    };
}