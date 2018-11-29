import React, { Component } from 'react';




const UserSelections = (props) => {
    console.log('hi');
    return (
        <button className={`userOptions__button userOptions__button--${props.type}`}
        onClick={props.getUserChoice}
        value={props.type}
        >
            <div className={`userOptions__image userOptions__image--${props.type}`}>
                <img src={props.img} alt={props.type}/>
            </div>
        </button>
    )
}






export default UserSelections;