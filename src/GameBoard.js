import React, { Component } from 'react';
import Cards from './Cards';

class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            userCardFront: {img: 'assets/noun_puppy_1963353.svg', alt: 'Default user image. A cute puppy.', customClass: 'card--user'},
            userCardBack: { img: 'assets/noun_puppy_1963353.svg', alt: 'Default user image. A cute puppy.', customClass: 'card--user'},
            compCardFront: {img: 'assets/noun_Robot_855943.svg', alt: 'Default computer image. A cute robot!', customClass: 'card--comp'},
            compCardBack: { img: 'assets/noun_Robot_855943.svg', alt: 'Default computer image. A cute robot!', customClass: 'card--comp'}
        }
    }
    // showUserChoice = (prop) => {
    //     this.setState({
    //         userCardBack: prop
    //     });
    // }
    // showUserChoice({props.userChoice});

    handleClick = () => {
        this.props.getCompChoice();
    }


    render() {
        return (
            <section className="gameBoard">
                <div className="gameBoard__playArea">
                    <div className="playerCards">
                        <Cards 
                        choice={this.props.userChoice}
                        front={this.state.userCardFront} 
                        back={this.state.userCardBack}
                        resolveRound={this.props.resolveRound}
                        flipped={this.props.userCardFlipped}
                        />                    
                        <Cards 
                        choice={this.props.compChoice}
                        front={this.state.compCardFront}
                        back={this.state.compCardBack}
                        resolveRound={this.props.resolveRound}
                        flipped={this.props.compCardFlipped}
                        />
                    </div>    
                    <div>
                        <button className="buttonStyling playButton" onClick={this.handleClick}>Play</button>
                    </div>
                </div>
            </section>
        )
    }
}


export default GameBoard;

//on 
//create a button that starts game
//randomely choose computer choice

