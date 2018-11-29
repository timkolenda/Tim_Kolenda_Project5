import React, { Component } from 'react';
import './App.css';
import options from './options';
import UserSelections from './UserSelections';
import GameBoard from './GameBoard';

class App extends Component {
  constructor(){
    super();
    this.state = {
      userChoice: "",
      compChoice: "",
      compWinCount: 0,
      userWinCount: 0,
      totalThrows: 0,
      scoreNeededToWin: 5,
      currentLeader: {},
      options: options
    }
  }
  getTotalThrows = () => {
    this.setState({
      totalThrows: this.state.compWinCount + this.state.userWinCount
    });
  }
  
  getUserChoice = (event) => {
    console.log(event.target.value);
    this.setState({
      userChoice: ''
    });
    this.setState({
      userChoice: event.target.value
    });
    // console.log(this.state.userChoice);
  }

  getCompChoice = (event) => {
    const compChoiceKeys = Object.keys(this.state.options);
    const compChoiceNumber = Math.floor(Math.random() * compChoiceKeys.length);
    console.log(compChoiceNumber);
    console.log('here', compChoiceKeys[compChoiceNumber]);
    this.setState({
      compChoice: compChoiceKeys[compChoiceNumber]
    })
    console.log('now here', this.state.compChoice);
  }


  render() {
    // console.log(this.state.options[this.state.userChoice]);
    return (
      <div className="App">
        <header>
          <h2>RPSLS</h2>
        </header>
        <main>
          <section>
            <GameBoard 
            compChoice={this.state.options[this.state.compChoice]}
            userChoice={this.state.options[this.state.userChoice]}
            getCompChoice={this.getCompChoice} />
            {/* <Card imageSelection={this.state.userChoice}/> */}
            {/* <Card imageSelection={this.state.compChoice} /> */}
          </section>
          <section className='userOptions'>
            {/* {this.state.options.map((option) => { */}
            {Object.keys(this.state.options).map((option) => { 
              // console.log(option); 
              // console.log(this.state.options[option]);
              return <UserSelections
              // choiceObject={option}
              type={this.state.options[option].type} 
              img={this.state.options[option].img}
              getUserChoice={this.getUserChoice}
              />
            })}
          </section>
        </main>
      </div>
    );
  }
}

export default App;
