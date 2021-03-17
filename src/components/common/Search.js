import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Loading from './Loading';

import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';

import './Search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      searchQuery: '',
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const searchQuery = event.target.value;

    this.setState({ searchQuery });

    if (!searchQuery) {
      return '';
    }

    this.setState({ loading: true });

    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then(result => {

        this.setState({
          searchResults: result,
          loading: false,
        });
      });
  };


  renderSearchResults = () => {
    const { searchResults, searchQuery } = this.state;

    if (!searchQuery) {
      return null
    };

    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {
            searchResults.map(result => (
              <div className="Search-result" key={result.id} onClick={() => this.handleRedirect(result.id)}>
                {result.name} ({result.symbol})
              </div>
            ))
          }
        </div>
      )
    }

    if (searchResults.length === 0) {
      return (
        <div className="Search-result-container">
          <div className="Search-result">No Results Found.</div>
        </div>
      )
    }

  };

  handleRedirect = (currencyId) => {

    this.setState({
      searchResults: [],
      searchQuery: ''
    })
    
    this.props.history.push(`/currency/${currencyId}`)
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="Search">
        <span className="Search-icon" />

        <input
          className="Search-input"
          type="text"
          placeholder="Currency name"
          onChange={this.handleChange}
        />

        {loading &&
          <div className="Search-loading">
            <Loading
              width='12px'
              height='12px'
            />
          </div>
        }

        {this.renderSearchResults()}

      </div>
    );
  }
};

export default withRouter(Search)
