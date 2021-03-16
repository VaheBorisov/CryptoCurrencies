import React, { Component } from 'react';

import "./Favourites.css";

import { onFavoriteClickCB } from '../../helpers';

import Table from '../list/Table';

export default class Favorites extends Component{
   constructor(){
      super();
      this.state = {
        favorites : JSON.parse(localStorage.getItem("favorites")) || []
      }
   }

   handleFavoriteClick = (event , currency) => {
      event.stopPropagation();

      this.setState(prevState => onFavoriteClickCB(prevState , currency))
      
  }

   render(){

      const {favorites} = this.state;

      const favoriteIDs = favorites.map(item => item.id);
      const currencies = favorites.map((item , index) => ({...item , rank : index + 1}));

      if(currencies.length === 0){
        return <h1 className="NotFound-title">You Don't Have Favorite Currencies</h1>
      }
      return (
         <Table 
            currencies={currencies} 
            favorites={favoriteIDs} 
            onFavoriteClick={this.handleFavoriteClick}
         />
      )
   }
}