import React, { Component } from 'react';
import User from "../User";
import Experience from "../Experience";
import Game from "../Game";

class SearchContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  state = {
    fields: {}
  }

  //Called on Submission of Form
  onSubmit = fields => {
    console.log("App Component got: ", fields);
  }

  render() {
    return (
      <div className="SearchContent">
        <h3>User</h3>
        <User onSubmit={fields => this.onSubmit(fields)} />
        <br />
        <h3>------------------------------------------</h3>
        <h3>Experience</h3>
        <Experience onSubmit={fields => this.onSubmit(fields)} />
        <br />
        <h3>------------------------------------------</h3>
        <h3>Game</h3>
        <Game onSubmit={fields => this.onSubmit(fields)} />
        <p>
        {JSON.stringify(this.state.fields, null, 2)}
        </p>
      </div>
    );
  }
}

export default SearchContent
