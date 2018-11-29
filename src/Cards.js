import React, { Component } from 'react';

//make a component that displays the cards

const Cards = (props) => {



    return (
        <div className="cardContainer">
            <div className="playerCards__cardFlipper playerCards__cardFlipper--user">
                <div class="card card--user card--front">
                    <img src={this.state.userCardFront.img} alt={this.state.userCardFront.alt} />
                </div>
                <div class="card card--user card--back">
                    <img src={this.state.userCardBack} alt="" />
                </div>
            </div>
        </div>
    )
}



export default Cards

