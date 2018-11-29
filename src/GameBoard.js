import React, { Component } from 'react';
import Cards from './Cards';

class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            durationArray: [],
            userCardFront: {img: 'assets/noun_puppy_1963353.svg', alt: 'Default user image. A cute puppy.'},
            userCardBack: {img: 'assets/noun_puppy_1963353.svg', alt: 'Default user image. A cute puppy.' },
            compCardFront: {img: 'assets/noun_Robot_855943.svg', alt: 'Default computer image. A cute robot!'},
            compCardBack: {img: 'assets/noun_Robot_855943.svg', alt: 'Default computer image. A cute robot!' }
        }
    }
    showUserChoice = (prop) => {
        this.setState({
            userCardBack: prop
        });
    }
    // showUserChoice({props.userChoice});

    handleClick = () => {
        this.props.getCompChoice();
    }


    render() {
        return (
            <section className="gameBoard">
                <h2>Game Board Area</h2>
                <div className="playerCards">
                    <Cards 
                    choice={this.props.userChoice}
                    front={this.state.userCardFront} 
                    back={this.state.userCardBack}
                    />
                    
                    <Cards 
                    choice={this.props.compChoice}
                    front={this.state.compCardFront}
                    back={this.state.compCardBack}/>
                    {/* <div className="cardContainer">
                        <div className="playerCards__cardFlipper playerCards__cardFlipper--user">
                            <div class="card card--user card--front">
                                <img src={this.state.userCardFront.img} alt={this.state.userCardFront.alt} />
                            </div>
                            <div class="card card--user card--back">
                                <img src={this.state.userCardBack} alt="" />
                            </div>
                        </div>    
                    </div>
                    <div className="cardContainer">
                        {/* <div className="playerCards__cardFlipper playerCards__cardFlipper--comp">
                            <div class="card card--comp card--front">
                                <img src={this.state.compCardFront.img} alt="this.state.compCardFront.alt" />
                            </div>
                            <div class="card card--comp card--back">
                                <img src="" alt="" />
                            </div>
                        </div> 
                    </div>*/}
                </div>    
                <div>
                    <button onClick={this.handleClick}>Play</button>
                </div>
            </section>
        )
    }
}


export default GameBoard;

//on 
//create a button that starts game
//randomely choose computer choice

