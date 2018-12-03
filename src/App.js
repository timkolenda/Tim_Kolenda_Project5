import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import options from './options';
import UserSelections from './UserSelections';
import Header from './Header';
import GameBoard from './GameBoard';
import Start from './Start';
import DisplayResult from './DisplayResult';
import EndGame from './EndGame';


const dbRef = firebase.database().ref();

class App extends Component {
  constructor(){
    super();
    this.state = {
      topPlayerName: "",
      topPlayerScore: 0,
      endGamePlayerData: [],
      nickName: "",
      onLandingPage: true,
      userChoice: "",
      compChoice: "",
      compWinCount: 0,
      userWinCount: 0,
      tieCount: 0,
      totalThrows: 0,
      scoreNeededToWin: 2,
      currentLeader: {},
      options: options,
      resultsDisplayed: false,
      roundResult: "",
      userCardFlipped: false,
      compCardFlipped: false,
      userImg: { img: 'assets/noun_puppy_1963353.svg', alt: 'Default user image. A cute puppy.', customClass: '--user'},
      compImg: { img: 'assets/noun_Robot_855943.svg', alt: 'Default computer image. A cute robot!', customClass: '--comp' }
    }
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleClickStart = (event) => {
    event.preventDefault();
    this.setState({
      onLandingPage: false
    });
  }

  handleClickDisplayResult = (event) => {
    event.preventDefault();
    this.setState({
      resultsDisplayed: false,
      userCardFlipped: false,
      compCardFlipped: false
    });
    //REMOVED ACTIVE FLIPPED ANIMATION HERE BEFORE CHOICE SET HAPPENS
    setTimeout(() => {
      this.setState({
        userChoice: "",
        compChoice: ""
      });
    }, 1000); 
  }

  getUserChoice = (event) => {
    // console.log(event.target.value);
    this.setState({
      userChoice: event.target.value,
      userCardFlipped: true
    });
    // console.log(this.state.userChoice);
  }

  getCompChoice = (event) => {
    const compChoiceKeys = Object.keys(this.state.options);
    const compChoiceNumber = Math.floor(Math.random() * compChoiceKeys.length);
    this.setState({
      compChoice: compChoiceKeys[compChoiceNumber],
      compCardFlipped: true
    });
    this.resolveRound();
  }

  resolveRound = () => {
    setTimeout(() => {
      this.caluculateResult();
    }, 1000);
  }

  caluculateResult = (event) => {
    // console.log('checking for results');
    if (this.state.userChoice && this.state.compChoice) {
      if (((this.state.userChoice === "rock") && (this.state.compChoice === "scissors"))
        || ((this.state.userChoice === "rock") && (this.state.compChoice === "lizard"))
        || ((this.state.userChoice === "paper") && (this.state.compChoice === "rock"))
        || ((this.state.userChoice === "paper") && (this.state.compChoice === "spock"))
        || ((this.state.userChoice === "scissors") && (this.state.compChoice === "paper"))
        || ((this.state.userChoice === "scissors") && (this.state.compChoice === "lizard"))
        || ((this.state.userChoice === "spock") && (this.state.compChoice === "rock"))
        || ((this.state.userChoice === "spock") && (this.state.compChoice === "scissors"))
        || ((this.state.userChoice === "lizard") && (this.state.compChoice === "paper"))
        || ((this.state.userChoice === "lizard") && (this.state.compChoice === "spock"))) {
        // console.log('win');
        this.setState({
          userWinCount: this.state.userWinCount + 1,
          roundResult: 'Round won!'
        })
      } else if (this.state.userChoice === this.state.compChoice) {
        // console.log('tie');
        this.setState({
          tieCount: this.state.tieCount + 1,
          roundResult: 'Round tied!'
        })
      } else {
        // console.log('lose');
        this.setState({
          compWinCount: this.state.compWinCount + 1,
          roundResult: 'Round lost!'
        })
      }
    }
    this.getTotalThrows();
  }

  getTotalThrows = () => {
    this.setState({
      totalThrows: this.state.compWinCount + this.state.userWinCount + this.state.tieCount
    });
    this.calculateGameEnd();
  }

  calculateGameEnd = () => {
    (this.state.userWinCount < 2) ? this.displayRoundResultAfterAnimation() : this.runEndGameFunctions();
  }

  displayRoundResultAfterAnimation = () => {
    setTimeout(() => {
      this.displayRoundResult();
    }, 1000);
  }

  displayRoundResult = () => {
    this.setState({
      resultsDisplayed: true
    });
  }

  runEndGameFunctions = () => {
    this.displayEndGameScreen();
    this.addPlayerToFireBase();
  }

  displayEndGameScreen = () => {
    console.log('end game screen display')
  }

  addPlayerToFireBase = () => {
    const newPlayer = {
      name: this.state.nickName,
      score: this.state.totalThrows,
      // date: new Date()
    }
    // const dbRef = firebase.database().ref('/leaderBoard');
    dbRef.push(newPlayer);
  }
  
  getTopPlayerData = () => {
    const newArray = Object.values(this.state.endGamePlayerData).sort((a, b) => a.score - b.score);
    console.log(newArray[0])
    this.setState({
      topPlayerName: newArray[0].name,
      topPlayerScore: newArray[0].score
    })
    
  }



  render() {
    return (
      <div className="App">
        <div>
          {this.state.onLandingPage 
            ? <Start 
            nickName={this.nickName} 
            handleChange={this.handleChange} 
            handleClick={this.handleClickStart}
            /> 
            : ''}
        </div>
        <header>
          <Header
          compImg={this.state.compImg}
          userImg={this.state.userImg}
          compWinCount={this.state.compWinCount}
          userWinCount={this.state.userWinCount}
          totalThrows={this.state.totalThrows}
          topPlayerName={this.state.topPlayerName}
          topPlayerScore={this.state.topPlayerScore}
          // endGamePlayerData={this.state.endGamePlayerData}
          // getTopPlayer={this.getTopPlayer}
          /> 
        </header>
        <main>
          <GameBoard 
          compChoice={this.state.options[this.state.compChoice]}
          userChoice={this.state.options[this.state.userChoice]}
          getCompChoice={this.getCompChoice} 
          userCardFlipped={this.state.userCardFlipped}
          compCardFlipped={this.state.compCardFlipped}
          />
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
        <section>
          {this.state.resultsDisplayed ? 
          <DisplayResult
          roundResult={this.state.roundResult}
          handleClick={this.handleClickDisplayResult}
          /> : ""}
        </section>
        <section>
          <EndGame />
        </section>
        
      </div>
    );
  }

  componentDidMount(){
    // const dbRef = firebase.database().ref('/leaderBoard');
    dbRef.on('value', (snapshot) => {
      console.log(snapshot.val());
      this.setState({
        endGamePlayerData: snapshot.val()
      })      
      this.getTopPlayerData();
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
