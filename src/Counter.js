import React, { Component } from 'react';

const Counter = (props) => {
    // let score = ''
    // if(props.icon){
    //     score = `<img src=${props.icon.img} alt=${props.icon.alt} />`;
    // } else {
    //     score = `<p>Score<p>`;
    // }
    return(
        <div class="header__scoreTrackerContainer">
            <div className={`label label${props.icon.customClass}`}>
                <img src={props.icon.img} alt={props.icon.alt ? props.icon.alt : 'Score'} />
            </div>
            <div className="score">
                <p>{props.score}</p>
            </div> 
        </div>
    )
} 

export default Counter  