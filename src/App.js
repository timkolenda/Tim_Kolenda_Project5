import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import swal from 'sweetalert';
import options from './options';
import UserSelections from './UserSelections';
import Header from './Header';
import GameBoard from './GameBoard';
import Start from './Start';
import DisplayResult from './DisplayResult';
import EndGame from './EndGame';
import LeaderBoard from './LeaderBoard';
import Instructions from './Instructions';


const dbRef = firebase.database().ref('/');

class App extends Component {
  constructor(){
    super();
    this.state = {
      topPlayerName: "",
      topPlayerScore: 0,
      endGamePlayerData: {},
      nickName: "",
      onLandingPage: false,
      userChoice: "",
      compChoice: "",
      compWinCount: 0,
      userWinCount: 0,
      tieCount: 0,
      totalThrows: 0,
      scoreNeededToWin: 5,
      currentLeader: {},
      options: options,
      resultsDisplayed: false,
      endGameDisplayed: false,
      roundResult: "",
      userCardFlipped: false,
      compCardFlipped: false,
      userImg: { img: 'assets/noun_puppy_1963353.svg', alt: 'Default user image. A cute puppy.', customClass: '--user'},
      compImg: { img: 'assets/noun_Robot_855943.svg', alt: 'Default computer image. A cute robot!', customClass: '--comp' },
      showLeaderBoard: false,
      displayInstructions: false,
      userCardsRemaining: [{ rock: 1 }, { scissors: 1 }, { paper: 1 }, { lizard: 1 }, { spock: 1 }],
      compCardsRemaining: [{ rock: 1 }, { scissors: 1 }, { paper: 1 }, { lizard: 1 }, { spock: 1 }],
      userChoiceDisabled: false
    }
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleClickStart = (event) => {
    event.preventDefault();
    console.log(this.state.nickName);
    // if (!this.state.nickName === '' && !this.state.nickName.includes(' '))
    if (this.state.nickName !== '' && !this.state.nickName.includes(' ')){
      this.setState({
        onLandingPage: false
      })
    } else {
      alert('Please enter a Nickname.');
    }
  }

  handleClickDisplayResult = (event) => {
    event.preventDefault();
    this.setState({
      resultsDisplayed: false,
      userCardFlipped: false,
      compCardFlipped: false
    });
    this.calculateGameEnd();
    setTimeout(() => {
      this.setState({
        userChoice: "",
        compChoice: "",
        userChoiceDisabled: false
      });
    }, 1000); 
  }

  handleClickShowLeaderboard = (event) => {
    event.preventDefault();
    this.setState({
      showLeaderBoard: !this.state.showLeaderBoard
    });
  }

  handleClickDisplayInstructions = (event) => {
    event.preventDefault();
    this.setState({
      displayInstructions: !this.state.displayInstructions
    });
  }

  handleClickEndGame = (event) => {
    event.preventDefault();
    this.setState({
      nickName: "",
      onLandingPage: true,
      userChoice: "",
      compChoice: "",
      compWinCount: 0,
      userWinCount: 0,
      tieCount: 0,
      totalThrows: 0,
      endGameDisplayed: false,
    });
  };

  

  getUserChoice = (event) => {
    const selection = event.target.value;
    if (this.state.userCardsRemaining[this.state.options[selection].index][selection] === 0) {
      alert('Please Choose another Card'); 
    } else {
      const newArray = this.state.userCardsRemaining;
      newArray[this.state.options[selection].index][selection] = newArray[this.state.options[selection].index][selection] - 1;
      this.setState({
        userChoice: event.target.value,
        userCardFlipped: true,
        userCardsRemaining: newArray,
        userChoiceDisabled: true
      });
    }
  }

  getCompChoice = (event) => {
    // this.state.compCardsRemaining.forEach((cardStack) => {
    //   if (cardStack[Object.keys(cardStack)[0]] === 0) {
    //     const newObject = this.state.options;
    //     delete newObject[cardStack[Object.keys(cardstack)]];
    //     this.setState({
    //       options: newObject
    //     });
    //   }
    // });
    const compChoiceKeys = Object.keys(this.state.options);
    const compChoiceNumber = Math.floor(Math.random() * compChoiceKeys.length);
    const newObject = this.state.compCardsRemaining;
    newObject[compChoiceKeys[compChoiceNumber]] = newObject[compChoiceKeys[compChoiceNumber]] - 1;
    if (this.state.userChoice !== ""){
      this.setState({
        compChoice: compChoiceKeys[compChoiceNumber],
        compCardsRemaining: newObject,
        compCardFlipped: true
      });
      this.resolveRound();
    } else {
      alert('Please make a selection before you play.')
    }
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
    this.displayRoundResultAfterAnimation();
  }

  calculateGameEnd = () => {
    if (this.state.userWinCount === this.state.scoreNeededToWin ){
      this.runEndGameFunctions();
    }
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
    // debugger;
    this.addPlayerToFireBase();
    // console.log('end game function');
    // const newPlayer = {
    //   name: this.state.nickName,
    //   score: this.state.totalThrows,
    //   // date: new Date()
    // }
    // const dbRef = firebase.database().ref('/leaderBoard');
    // dbRef.push(newPlayer);
    setTimeout(() => {
      this.displayEndGameScreen();
    }, 2000);
  }

  displayEndGameScreen = () => {
    this.setState({
      endGameDisplayed: true
    })
  }

  addPlayerToFireBase = () => {
    console.log('push to firebase')
    const newPlayer = {
      name: this.state.nickName,
      score: this.state.totalThrows,
      // date: new Date()
    }
    // const dbRef = firebase.database().ref('/leaderBoard');
    dbRef.push(newPlayer);
  }
  
  getTopPlayerData = () => {
    if ((this.state.endGamePlayerData)) {
      const newArray = Object.values(this.state.endGamePlayerData).sort((a, b) => a.score - b.score);
      console.log(newArray[0])
      this.setState({
        topPlayerName: newArray[0].name,
        topPlayerScore: newArray[0].score
      })
      console.log(this.state.topPlayerName);
      console.log(this.state.topPlayerScore);
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
          handleClickShowLeaderboard={this.handleClickShowLeaderboard}
          handleClickDisplayInstructions={this.handleClickDisplayInstructions}
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
              userChoiceDisabled={this.state.userChoiceDisabled}
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
          {this.state.endGameDisplayed ?
          // console.log('false')
          <EndGame
          score={this.state.totalThrows}
          name={this.state.nickName}
          topPlayerName={this.state.topPlayerName}
          topPlayerScore={this.state.topPlayerScore}
          handleClick={this.handleClickEndGame}
          /> 
          : ""}
        </section>
        <section>
          {this.state.showLeaderBoard ? 
          <LeaderBoard 
          /> : ""}
        </section>
        <section>
          {this.state.showLeaderBoard ?
          <Instructions
          /> : ""}
        </section>
      </div>
    );
  }

  componentDidMount(){
    // const dbRef = firebase.database().ref('/leaderBoard');
    dbRef.on('value', (snapshot) => {
      console.log('new data in firebase', snapshot.val());
      const newEndGamePlayerData = Object.assign({}, snapshot.val())
      this.setState({
        endGamePlayerData: newEndGamePlayerData
      });
      console.log('new data in state', this.state.endGamePlayerData);
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
