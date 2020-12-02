import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown, Input } from 'semantic-ui-react'

const floatRegExp = /^[0-9\b]+$/;
const gameMap = new Map();

class SurveyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supportedGameList: [],
      Name: "",
      Age: "",
      currGameName: "",
      currGameId: "",
      currRating: "",
      ExperienceList:[]
    };
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeGame = this.onChangeGame.bind(this);
    this.onSubmitExperience = this.onSubmitExperience.bind(this);
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/get-gamelist/")
      .then((response) => {
        let tempGames = []
        var i;
        for (i = 0; i < response.data.length; i++) {
          var tempGame = {
            key: response.data[i][1],
            text: response.data[i][1],
            value: response.data[i][0]
          }
          gameMap.set(response.data[i][0], response.data[i][1])
          tempGames.push(tempGame)
        }
        this.setState({
          supportedGameList: tempGames
        });
        console.log(gameMap)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onChangeNumber(e){
    if (e.target.value === '' || floatRegExp.test(e.target.value)) {
       this.setState({currRating: e.target.value})
    }
  }

  onChangeGame(e, data) {
    this.setState({
      currGameName: gameMap.get(data.value),
      currGameId: data.value
    });
  }

  onAddItem = () => {
    let tempExp = {
      currGameId: this.state.currGameId,
      currRating: this.state.currRating
    }
    if (!this.state.ExperienceList.includes(this.state.currGameId)) {
      this.setState(state => {
        const ExperienceList = state.ExperienceList.concat(tempExp);
        return {
          ExperienceList,
          currGameName: "",
          currRating: "",
          currGameId: ""
        };
      });
    }
  };

  onSubmitExperience = () => {
    if (this.state.Age == "" || this.state.Name == "" || this.state.ExperienceList == []) {
      alert("Missing information!")
      return
    }
    let sendRequest = {
      Name: this.state.Name,
      Age: this.state.Age,
      ExperienceList: this.state.ExperienceList
    }
    axios.post("http://127.0.0.1:8000/api/put-experience/", sendRequest)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="SurveyContent">
        <form>
          <h2>New user registration</h2>
          <label htmlFor="userName">User Name</label>
          <br />
          <Input className="inputBar" placeholder = "Your name" value = {this.state.Name} onChange={e => this.setState({Name: e.target.value})}/>

          <br />
          <label htmlFor="age">Age</label>
          <br />
          <Input className="inputBar" placeholder = "Your age" value = {this.state.Age} onChange={e => this.setState({Age: e.target.value})}/>
        </form>

        <form>
          <h2>Add experience and rating</h2>
          <div>
            <div className="experienceRow">
              <div align="center" className="float-left">
                <label className="experienceLabel">Game</label>
                <br />
                <Dropdown className="inputBar" placeholder = "Game name" fluid search selection options={this.state.supportedGameList} onChange={this.onChangeGame}/>
              </div>
              <div align="center" className="float-left">
                <label className="experienceLabel">Rating</label>
                <br />
                <Input className="inputBar" placeholder = "Your rating(integer from 1 to 10)" value = {this.state.currRating} onChange={this.onChangeNumber}/>
              </div>
            </div>
          </div>
          <br />
          <button className="surveyButton" onClick={this.onAddItem} disabled={!this.state.currGameName || !this.state.currRating}>Add</button>
        </form>

        <button className="surveyButton" onClick={this.onSubmitExperience}>Submit</button>

        <form>
          <h2>Added experience</h2>
          <div>
            {this.state.ExperienceList.map(function(d, idx){
              return (<li key={d.currGameId}>Game Name: {gameMap.get(d.currGameId)}, Your Rating: {d.currRating}</li>)
            })}
          </div>
        </form>
      </div>
    );
  }
}

export default SurveyContent
