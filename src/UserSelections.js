import React, { Component } from 'react';




const UserSelections = (props) => {
    // console.log(props.choiceObject)
    return (
        <button className={`userOptions__button userOptions__button--${props.type}`}
        onClick={props.getUserChoice}
        value={props.type}
        {props.userChoiceDisabled ? 'disabled' : ""}
        >
            <div className={`userOptions__image userOptions__image--${props.type}`}>
                <img src={props.img} alt={props.alt}/>
            </div>
        </button>
    )
}






export default UserSelections;