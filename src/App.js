import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import options from './options';
import UserSelections from './UserSelections';
import GameBoard from './GameBoard';
import Start from './Start';




class App extends Component {
  constructor(){
    super();
    this.state = {
      leaderBoard: [],
      nickName: '',
      onLandingPage: true,
      userChoice: "",
      compChoice: "",
      compWinCount: 0,
      userWinCount: 0,
      tieCount: 0,
      totalThrows: 0,
      scoreNeededToWin: 5,
      currentLeader: {},
      options: options
    }
  }
  getTotalThrows = () => {
    this.setState({
      totalThrows: this.state.compWinCount + this.state.userWinCount + this.state.tieCount
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      onLandingPage: false,
    });
  }
  
  getUserChoice = (event) => {
    console.log(event.target.value);
    this.setState({
      userChoice: event.target.value
    });
    // console.log(this.state.userChoice);
  }

  getCompChoice = (event) => {
    const compChoiceKeys = Object.keys(this.state.options);
    const compChoiceNumber = Math.floor(Math.random() * compChoiceKeys.length);
    this.setState({
      compChoice: compChoiceKeys[compChoiceNumber]
    });
    this.resolveRound();
  }

  resolveRound = () => {
    setTimeout(() => {
      this.caluculateResult();
    }, 1000);
  }

  caluculateResult = (event) => {
    console.log('checking for results');
    if (this.state.userChoice && this.state.compChoice) {
      if (((this.state.userChoice === "rock") && (this.state.compChoice === "scissors"))
        || ((this.state.userChoice === "paper") && (this.state.compChoice === "rock"))
        || ((this.state.userChoice === "scissors") && (this.state.compChoice === "paper"))
        || ((this.state.userChoice === "scissors") && (this.state.compChoice === "lizard"))
        || ((this.state.userChoice === "rock") && (this.state.compChoice === "lizard"))
        || ((this.state.userChoice === "paper") && (this.state.compChoice === "spock"))
        || ((this.state.userChoice === "spock") && (this.state.compChoice === "rock"))
        || ((this.state.userChoice === "spock") && (this.state.compChoice === "scissors"))
        || ((this.state.userChoice === "lizard") && (this.state.compChoice === "paper"))) {
        console.log('win');
        this.setState({
          userWinCount: this.state.userWinCount + 1
        })
      } else if (this.state.userChoice === this.state.compChoice) {
        console.log('tie');
        this.setState({
          tieCount: this.state.tieCount + 1
        })
      } else {
        console.log('lose');
        this.setState({
          compWinCount: this.state.compWinCount + 1
        })
      }
    }
  }

  


  render() {
    return (
      <div className="App">
        <div>
          {this.state.onLandingPage 
            ? <Start 
            nickName={this.nickName} 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit}
            /> 
            : ''}
        </div>
        <header>
          <h2>RPSLS</h2>
        </header>
        <main>
          <section>
            <GameBoard 
            compChoice={this.state.options[this.state.compChoice]}
            userChoice={this.state.options[this.state.userChoice]}
            getCompChoice={this.getCompChoice} 
            />
          </section>
          <section className='userOptions'>
            {Object.keys(this.state.options).map((option) => { 
              return <UserSelections
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

  componentDidMount(){
    const dbRef = firebase.database().ref('/leaderBoard');
    dbRef.on('value', (snapshot) => {
      // console.log(snapshot.val());
      const newLeaderBoard = Array.from(this.state.leaderBoard);
      newLeaderBoard.push(snapshot.val());
      this.setState({
        leaderBoard: newLeaderBoard
      })      
    });
    

    // updateInventory = (event) => {
    //   console.log('I was called');
    //   console.log(event.target.value);
    //   //first clone the current state so we are not modifying state directly
    //   const newDonuts = Array.from(this.state.donuts);
    //   //subtract one form the donut dinventory at [event.target.value]
    //   newDonuts[event.target.value].inventory = newDonuts[event.target.value].inventory - 1;
    //   //^^^^ could also use newDonuts[event.target.value].inventory--;
    //   this.setState({
    //     donuts: newDonuts
    //   });
    // }




  }


}

export default App;
