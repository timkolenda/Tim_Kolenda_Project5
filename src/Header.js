import React, { Component } from 'react';
import Counter from './Counter';

const Header = (props) => {
    return (
        <div className="header">
            <div className="header__leaderBoard">
                <p>Name</p>
                <p>Score</p>
            </div>
            <div className="header__title">
                <h2>RPSLS</h2>
            </div>
            <div className="header__scoreTracker">
                <Counter icon={props.userImg} score={props.userWinCount}/>
                <Counter icon={props.compImg} score={props.compWinCount}/>
                <Counter icon={0} score={props.totalThows}/>
            </div>

        </div>

    )
}

export default Header