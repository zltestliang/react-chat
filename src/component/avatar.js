import React from 'react';

import '../css/avatar.css';

class Avatar extends React.Component{
    render(){
        return (
            <img className="avatar-img" src={this.props.src} onClick={this.props.handleClick}/>
        )
        
    }
    
    
}

export default Avatar;