import React, { Component } from 'react';
import './App.css';
import UserSelections from './UserSelections';
import options from './options';

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

  
    
    
    
  render() {
    console.log(this.state.options);
    return (
      <div className="App">
        <header>
          <h2>RPSLS</h2>
        </header>
        <section></section>
        <section>
          {this.state.options.map((option) => {
            return <UserSelections
            type={option.type} 
            img={option.img}
            getUserChoice={this.getUserChoice}
            />
          })}
        </section>
      </div>
    );
  }
}

export default App;
