import React, { Component } from 'react';


const UserSelections = (props) => {
    console.log('hi');
    return (
        <button 
        onClick={props.getUserChoice}
        value={props.type}
        >
            <div className={`userOption userOption--${props.type}`}>
                <img src={props.img} alt={props.type}/>
            </div>
        </button>
    )
}






export default UserSelections;