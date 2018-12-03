import React, { Component } from 'react';


const Start = (props) => {
    

    return (
        <div className='front-page'>
          <div className="front-page__content">
            <div className="appName">
                <h2><span>R</span><span>P</span><span>S</span><span>L</span><span>S</span></h2>
            </div>
            <form className="front-page__form"    action="">
                <label htmlFor="nickName">Enter a nickname</label>
                <input onChange={props.handleChange} type="text" id="nickName" val={props.nickName}/>
                <button className="buttonStyling" onClick={props.handleClick}
                >Start Game</button>
            </form>
          </div>
        </div> 
    )
}

export default Start