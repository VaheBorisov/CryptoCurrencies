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
            totalPages: null
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

    render() {
        const {loading, ths, currencies, page, totalPages} = this.state

        if(loading) {
            return <Loading />
        }
        
        
        return (
            <React.Fragment>

                <Table currencies={currencies} ths={ths}/>
                
                <Pagination page={page} totalPages={totalPages} handlePaginationClick={this.handlePaginationClick}/>
                
            </React.Fragment>
        );
    };
}