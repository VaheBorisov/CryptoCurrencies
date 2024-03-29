import React, { Component } from 'react';

import Loading from "../common/Loading"

import "./Detail.css"

import { API_URL } from "../../config"
import { handleResponse, renderChangePercent } from "../../helpers"


export default class Detail extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      currency: {}
    }
  }

  fetchCurrency = (currencyId) => {
    this.setState({loading: true});

    fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
      .then(handleResponse)
      .then(currency => {
        this.setState({
          currency,
          loading: false,
          error: null
        })
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.errorMessage,
        });
      });
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.match.params.currencyId !== this.props.match.params.currencyId){

      const currencyId = nextProps.match.params.currencyId;

      this.fetchCurrency(currencyId);
    }

  }

  componentDidMount() {

    const currencyId = this.props.match.params.currencyId;
        
    this.fetchCurrency(currencyId);  
  }

  render() {
    const { loading, error, currency } = this.state;

    if (loading) {
      return <div className="loading-container"> 
          <Loading />
        </div>
    }

    if (error) {
      return <div className="error">{error}</div>
    }
    
    return (
      <div className="Detail">
        <h1 className="Detail-heading">
          {currency.name} ({currency.symbol})
        </h1>
    
        <div className="Detail-container">
          <div className="Detail-item">
            Price <span className="Detail-value">$ {currency.price}</span>
          </div>

          <div className="Detail-item">
            Rank <span className="Detail-value">{currency.rank}</span>
          </div>

          <div className="Detail-item">
            24H Change
            <span className="Detail-value">{renderChangePercent(currency.percentChange24h)}</span>
          </div>

          <div className="Detail-item">
            <span className="Detail-title">Market cap</span>
            <span className="Detail-dollar">$</span>
            {currency.marketCap}
          </div>

          <div className="Detail-item">
            <span className="Detail-title">24H Volume</span>
            <span className="Detail-dollar">$</span>
            {currency.volume24h}
          </div>

          <div className="Detail-item">
            <span className="Detail-title">Total supply</span>
            {currency.totalSupply}
          </div>
        </div>
      </div>
    );
  }
}