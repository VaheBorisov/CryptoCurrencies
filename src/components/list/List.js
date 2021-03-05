import React, {Component} from "react";

import Loading from "../common/Loading";
import Table from "./Table";
import Pagination from "./Pagination";


export default class List extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            currencies: [],
            ths: ["Cryptocurrency" , "Price" , "Market Cap" , "24H Change", "Favorites"],
            page: 1,
            totalPages: null,
            favourites: JSON.parse(localStorage.getItem('favouritesList')) || []
        }

    };

    componentDidMount() {
        this.fetchCurrencies();
    }


    // handleRightClick = () => {
    //     this.setState({
    //         page: this.state.page + 1
    //     }, this.fetchCurrencies);
    // }

    // handleLeftClick = () => {
    //     this.setState({
    //         page: this.state.page - 1
    //     }, this.fetchCurrencies)
    // }

    handlePaginationClick = (direction) => {
        let {page} = this.state;
        page = direction === 'next' ? page + 1 : page - 1;

        this.setState({
            page
        }, this.fetchCurrencies)
    }

    fetchCurrencies= () => {

        this.setState({
            loading: true
        })

        const {page} = this.state
        fetch(`https://api.udilia.com/coins/v1/cryptocurrencies?page=${page}&perPage=20`)
            .then(response => response.json())
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
        if (this.state.favourites.includes(id)) favourites.splice(this.state.favourites.indexOf(id), 1);
        localStorage.setItem('favouritesList', JSON.stringify(favourites));
        this.setState({
            favourites
        });
    };


    render() {
        const {loading, ths, currencies, page, totalPages, favourites} = this.state

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