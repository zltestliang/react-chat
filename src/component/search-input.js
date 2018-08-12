import React from 'react';

import '../css/search-input.css';

class SearchInput extends React.Component{
    render(){
        return (
            <div className="search-input">
                <i className="search-icon"></i>
                <input placeholder="搜索"/>
            </div>
        )
    }
}

export default SearchInput;