import React, { Component } from 'react';
import Counter from './Counter';


// getTopPlayer = () => {
//     const newArray = Object.values(this.state.endGamePlayerData).sort((a, b) => a.score - b.score);
//     console.log(newArray[0])
//     return newArray[0];
// }

const Header = (props) => {
    return (
        <div className="header">
            <div className="header__options">
                <div>
                    <button className="buttonStyling" onClick={props.handleClickShowLeaderboard}>Leaderboard</button>
                </div>
                <div>
                    <button className="buttonStyling" onClick={props.handleClickDisplayInstructions}>How to play</button>
                </div>
            </div>
            <div className="header__title appName">
                <h2><span>R</span><span>P</span><span>S</span><span>L</span><span>S</span></h2>
            </div>
            <div className="header__scoreTracker">
                <div className="header__scoreTrackerPositioner">
                    <Counter icon={props.userImg} score={props.userWinCount}/>
                    <Counter icon={props.compImg} score={props.compWinCount}/>
                    <Counter icon={0} score={props.totalThrows}/>
                </div>    
            </div>

        </div>

    )
}

export default Header