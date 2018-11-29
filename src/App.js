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
  
  getUserChoice = (choice) => {
    console.log(choice.target.value);
    this.setState({
      userChoice: choice.target.value
    })
  }

  setCompChoice = choice => {
    const compChoiceNumber = Math.floor(Math.random() * this.state.options.length);
    console.log(compChoiceNumber);
    this.setState({
      compChoice: this.state.options[compChoiceNumber].type
    })
  }

  render() {
    console.log(this.state.options.length);
    return (
      <div className="App">
        <header>
          <h2>RPSLS</h2>
        </header>
        <main>
          <section>
            <GameBoard userChoice={this.state.userChoice}/>
            {/* <Card imageSelection={this.state.userChoice}/> */}
            {/* <Card imageSelection={this.state.compChoice} /> */}
          </section>
          <section className='userOptions'>
            {this.state.options.map((option) => {
              return <UserSelections
              type={option.type} 
              img={option.img}
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
