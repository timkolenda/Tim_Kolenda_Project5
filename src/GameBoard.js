import React, { Component } from 'react';


class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            durationArray: [],
            playerCard: '',
            computerCard: '',

        }
    }

    handleClick = () => {
        //
    }


    render() {
        return (
            <section className="gameBoard">
                <h2>Game Board Area</h2>
                <div className="playerCards">
                    <div className="cardContainer">
                        <div className="playerCards__cardFlipper playerCards__cardFlipper--user">
                            <div class="card card--user card--front">
                                {/* <img src="" alt=""> */}
                            </div>
                            <div class="card card--user card--back">
                                {/* <img src="" alt=""> */}
                            </div>
                        </div>    
                    </div>
                    <div className="cardContainer">
                        <div className="playerCards__cardFlipper playerCards__cardFlipper--comp">
                            <div class="card card--comp card--front">
                                {/* <img src="" alt=""> */}
                            </div>
                            <div class="card card--comp card--back">
                                {/* <img src="" alt=""> */}
                            </div>
                        </div>
                    </div>
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

