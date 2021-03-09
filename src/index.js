import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route , Switch } from 'react-router-dom'

import Header from "./components/common/Header";
import List from "./components/list/List";
import NotFound from "./components/notfound/NotFound";
import Detail from "./components/detail/Detail";
import Favourites from "./components/Favourites/Favourites"


import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />

        <Switch>
          <Route path="/" component={List} exact />
          <Route path="/currency/:currencyId" component={Detail} exact/>
          <Route path="/currnecy/favourites" component={Favourites} exact/>
          <Route component={NotFound} />
        </Switch>  
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
