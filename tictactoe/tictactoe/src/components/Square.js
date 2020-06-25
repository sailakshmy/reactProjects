import React from 'react';


function Square(props) {
    /*constructor(props){
        super(props);
        this.state={
            value: null
        };
    }*/

    
        return(
            <button 
            className="square" 
            onClick = {props.onClick}>
                {props.value}
            </button>
        )
    
}

export default Square