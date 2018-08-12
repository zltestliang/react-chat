import React from 'react';
import SearchInput from '../component/search-input';


import '../css/search-box.css';

class SearchBox extends React.Component{
    render(){
        return (
            <div className="search-box">
                <SearchInput/>
            </div>
        )

    }
}

export default SearchBox;