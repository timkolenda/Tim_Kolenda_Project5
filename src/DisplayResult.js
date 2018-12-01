import React, { Component } from 'react';



const DisplayResult = (props) => {
    return(
        <div className="roundResult">
            <h3 className="roundResult__title">{props.roundResult}</h3>
        </div>
    )
}

export default DisplayResult 