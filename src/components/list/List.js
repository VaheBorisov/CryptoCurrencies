import React, {Component} from "react";

import Loading from "../common/Loading";
import Table from "./Table";
import Pagination from "./Pagination";

import { API_URL } from '../../config';
import { handleResponse, onFavoriteClickCB } from "../../helpers";




export default class List extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            currencies: [],
            page: 1,
            totalPages: null,
            favorites: JSON.parse(localStorage.getItem('favorites')) || []
        }

    };

    componentDidMount() {
        this.fetchCurrencies()
    }
    
    handlePaginationClick = (direction) => {
        let {page} = this.state;
        page = direction === 'next' ? page + 1 : page - 1;

        this.setState({
            page
        }, this.fetchCurrencies)
    }

    fetchCurrencies() {
        this.setState({ loading: true });
        
        const { page } = this.state;
    
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
          .then(handleResponse)
          .then((data) => {
            const { currencies, totalPages } = data;
    
            this.setState({
              currencies,
              totalPages,
              loading: false,
            });
          })
          .catch((error) => {
            this.setState({
              error: error.errorMessage,
              loading: false,
            });
          });
    }

    handleFavoriteClick = (event , currency) => {
        event.stopPropagation();

        this.setState(prevState => onFavoriteClickCB(prevState , currency))
        
    }

    render() {
        const {loading, currencies, page, totalPages, favorites} = this.state;
        const favoriteIDs = favorites.map(item => item.id);

        if(loading) {
            return <div className="loading-container">
                <Loading />
            </div>
        }
        
        
        return (
            <React.Fragment>

                <Table 
                    currencies={currencies}
                    onFavoriteClick={this.handleFavoriteClick} 
                    favorites={favoriteIDs}
                />
                
                <Pagination 
                    page={page} 
                    totalPages={totalPages} 
                    handlePaginationClick={this.handlePaginationClick}
                />
                
            </React.Fragment>
        );
    };
}