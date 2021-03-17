import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route , Switch } from 'react-router-dom'

import Header from "./components/common/Header";

import "./index.css";

const List = lazy(() => import("./components/list/List"));
const Detail = lazy(() => import("./components/detail/Detail"));
const NotFound = lazy(() => import("./components/notfound/NotFound"));
const Favourites = lazy(() => import("./components/Favourites/Favourites"));


function App() {
  return (
    <BrowserRouter>
      <div>
        <Suspense fallback={<div>fallback</div>}>
          <Header />

          <Switch>

            <Route path="/" component={List} exact />
            <Route path="/currency/:currencyId" component={Detail} exact/>
            <Route path="/currencies/favourites" component={Favourites} exact/>
            <Route component={NotFound} />

          </Switch>  
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
