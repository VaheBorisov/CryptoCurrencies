export const handleResponse = response => {
    if(response.ok) {
        return response.json();
    };
    return Promise.reject(response)
}

export const renderChangePercent = (percent) => {
    if (percent > 0) {
        return <span className="percent-raised">{percent}% &uarr;</span>
    } else if (percent < 0) {
        return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
        return <span>{percent}</span>
    }
};

export function fetchCurrencies (url) {
    this.setState({
        loading: true
    })
    
    fetch(url)
        .then(handleResponse)
        .then(({currencies}) => {
            this.setState({
                currencies,
                loading: false 
            });
        })
}

export function handleAddFavorite (id) {
        
    if (this.state.favourites.length === 0 || !this.state.favourites.includes(id)) {
        
        localStorage.setItem('favouritesList', JSON.stringify([...this.state.favourites, id]) );
    };
    
    let favourites = JSON.parse(localStorage.getItem('favouritesList'));

    this.state.favourites.includes(id) && favourites.splice(this.state.favourites.indexOf(id), 1);

    localStorage.setItem('favouritesList', JSON.stringify(favourites));
    this.setState({
        favourites
    });
};
