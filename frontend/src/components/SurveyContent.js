import React, { Component } from 'react';

const floatRegExp = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')

class SurveyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      Name: "",
      Age: "",
      currGameName: "",
      currRating: "",
      ExperienceList:[]
    };
    this.onChangeNumber = this.onChangeNumber.bind(this);
  }

  state = {
    fields: {}
  }

  //Called on Submission of Form
  onSubmit = fields => {
    console.log("App Component got: ", fields);
  }

  onChangeNumber(e){
    if (e.target.value === '' || floatRegExp.test(e.target.value)) {
       this.setState({currRating: e.target.value})
    }
  }

  onAddItem = () => {
    let tempExp = {
      currGameName: this.state.currGameName,
      currRating: this.state.currRating
    }
    this.setState(state => {
      const ExperienceList = state.ExperienceList.concat(tempExp);
      return {
        ExperienceList,
        currGameName: "",
        currRating: ""
      };
    });
  };

  onPrint = () => {
    console.log(this.state)
  }

  render() {
    return (
      <div className="SurveyContent">
        <form>
          <h2>New user registration</h2>
          <label htmlFor="userName">User Name</label>
          <br />
          <input className="inputBar" placeholder = "Your name" value = {this.state.Name} onChange={e => this.setState({Name: e.target.value})}/>

          <br />
          <label htmlFor="age">Age</label>
          <br />
          <input className="inputBar" placeholder = "Your age" value = {this.state.Age} onChange={e => this.setState({Age: e.target.value})}/>
        </form>

        <form>
          <h2>Add experience and rating</h2>
          <div>
            <div className="experienceRow">
              <div align="center" className="float-left">
                <label className="experienceLabel">Game</label>
                <br />
                <input className="inputBarExperience" placeholder = "Game name" value = {this.state.currGameName} onChange={e => this.setState({currGameName: e.target.value})}/>
              </div>
              <div align="center" className="float-left">
                <label className="experienceLabel">Rating</label>
                <br />
                <input className="inputBarExperience" placeholder = "Your rating" value = {this.state.currRating} onChange={this.onChangeNumber}/>
              </div>
            </div>
          </div>
          <br />
          <button className="surveyButton" onClick={this.onAddItem} disabled={!this.state.currGameName || !this.state.currRating}>Add</button>
        </form>

        <button className="surveyButton" onClick={this.onPrint}>Submit</button>
      </div>
    );
  }
}

export default SurveyContent
