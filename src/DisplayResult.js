import React, { Component } from 'react';



const DisplayResult = (props) => {
    return(
        <div className="roundResult">
            <div className="roundResult__resultContainer">
                <h3 className="roundResult__title">{props.roundResult}</h3>
                <button className="buttonStyling" onClick={props.handleClick} >Next round</button>
            </div>
        </div>
    )
}

export default DisplayResult 