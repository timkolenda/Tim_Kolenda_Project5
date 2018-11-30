import React, { Component } from 'react';


const Start = (props) => {
    

    return (
        <div className='front-page'>
          <div className="front-page__content">
            <h2>RPSLS</h2>
            <form action="">
                <label htmlFor="nickName">Enter a nickname</label>
                <input onChange={props.handleChange} type="text" id="nickName" val={props.nickName}/>
                <button onClick={props.handleSubmit} >Start Game</button>
            </form>
          </div>
        </div> 
    )
}

export default Start