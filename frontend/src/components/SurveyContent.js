import React, { Component } from 'react';
import axios from 'axios';
import User from "../User";
import Experience from "../Experience";
import Game from "../Game";

let dummydata = null;

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.ClickHandler = this.ClickHandler.bind(this);
  }

  ClickHandler() {
    console.log("Connecting to Django...");
    axios.get("http://127.0.0.1:8000/api/")
      .then((response) => {
        console.log(response.data)
        dummydata = JSON.stringify(response.data)
        this.setState({
          show: true
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }
  state = {
    fields: {}
  }
  //Called on Submission of Form
  onSubmit = fields => {
    console.log("App Component got: ", fields);
  }
}

const SurveyContent = () => {
  return (
    <div className="SurveyContent">
      <div className='form-container'>
        {/*{(this.state.show) ? dummydata : null} */}
      </div>
      <User onSubmit={fields => this.onSubmit(fields)} />
      <br />
      <Experience onSubmit={fields => this.onSubmit(fields)} />
      <br />
      <Game onSubmit={fields => this.onSubmit(fields)} />
      <p>
      {/*{JSON.stringify(this.state.fields, null, 2)} */}
      </p>
    </div>
  )
}

export default SurveyContent
