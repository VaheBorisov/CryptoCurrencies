import React, {Component} from "react";

import Loading from "../common/Loading";
import Table from "./Table";
import Pagination from "./Pagination";

import { API_URL, ths } from '../../config';
import { fetchCurrencies, handleAddFavorite } from "../../helpers";




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
        const {page} = this.state
        fetchCurrencies.call(this, `${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
    }
    
        handlePaginationClick = (direction) => {
        let {page} = this.state;
        page = direction === 'next' ? page + 1 : page - 1;

        this.setState({
            page
        }, this.fetchCurrencies)
    }

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
                    handleAddFavorite={handleAddFavorite.bind(this)} 
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