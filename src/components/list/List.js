import React, {Component} from "react";

import Loading from "../common/Loading";
import Table from "./Table";
import Pagination from "./Pagination";

import { API_URL, ths } from '../../config';
import { handleResponse } from "../../helpers";




export default class List extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            currencies: [],
            page: 1,
            totalPages: null,
            favourites: JSON.parse(localStorage.getItem('favouritesList')) || []
        }

    };

    componentDidMount() {
        this.fetchCurrencies();
    }
    
        handlePaginationClick = (direction) => {
        let {page} = this.state;
        page = direction === 'next' ? page + 1 : page - 1;

        this.setState({
            page
        }, this.fetchCurrencies)
    }

    fetchCurrencies = () => {

        this.setState({
            loading: true
        })
        
        const {page} = this.state
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then(({currencies, totalPages}) => {
                this.setState({
                    currencies,
                    totalPages,
                    loading: false 
                });
            })
    }

    handleAddFavorite = (id) => {
        
        if (this.state.favourites.length === 0 || !this.state.favourites.includes(id)) {
            const favoriteList = [...this.state.favourites, id];
            
            localStorage.setItem('favouritesList', JSON.stringify(favoriteList) );
        };
        
        let favourites = JSON.parse(localStorage.getItem('favouritesList'));

        this.state.favourites.includes(id) && favourites.splice(this.state.favourites.indexOf(id), 1);

        localStorage.setItem('favouritesList', JSON.stringify(favourites));
        this.setState({
            favourites
        });
    };


    render() {
        const {loading, currencies, page, totalPages, favourites} = this.state

        if(loading) {
            return <Loading />
        }
        
        
        return (
            <React.Fragment>

                <Table 
                    currencies={currencies}
                    ths={ths} 
                    handleAddFavorite={this.handleAddFavorite} 
                    favourites={favourites}
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