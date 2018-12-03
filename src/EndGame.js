import React, { Component } from 'react';

const EndGame = (props) => {



    return (
        <div className="endGame">
            <div className="endGame__content">
                <p>Congratulations {props.name}!</p>
                <p>You Completed the game after only {props.score} rounds!</p>
                {console.log('score', props.score)}
                {console.log('high score', props.topPlayerScore)}
                {console.log('name', props.name)}
                {console.log('top name', props.topPlayerName)}
                <p>{(props.score === props.topPlayerScore && props.name === props.topPlayerName) ? 'You hold the high score!' : 'You do not hold the high score.'}</p>
            </div>
        </div>
    )
}

export default EndGame