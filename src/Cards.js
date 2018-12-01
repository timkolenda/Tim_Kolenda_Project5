import React, { Component } from 'react';


//make a component that displays the cards
const Cards = (props) => {
// class Cards extends Component {
//     constructor() {
//         super();
    
//     }
    // console.log('this', props.front.img);
   
    return (
        <div className="cardContainer">
            <div className={`playerCards__cardFlipper ${props.flipped ? 'playerCards__cardFlipper--active' : ''}`}>
                <div className={`card card--front`}>
                    <img src={props.front.img} alt={props.front.alt} />
                </div>
                <div className={`card card--back ${props.choice ? props.choice.customClass : ''}`}>
                    <img src={`${props.choice ? props.choice.img : ''}`} alt={`${props.choice ? props.choice.alt : ''}`} />
                </div>
            </div>
        </div>
    )
    
}



export default Cards

// 