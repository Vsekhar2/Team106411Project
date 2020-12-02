import React from 'react';
import axios from 'axios';

let myData = null;

export default class Header extends React.Component {
  state = {
    userId: ""
  }

  // should call api to access MongoDB database, pull user recommendations
  onInput = (e) => {
    // pythonProcess.stdout.on('data', (data));
 };


  render() {
    return (
      <div className="Header">
      <br />

       <input
       placeholder = "UserId: "
       value = {this.state.UserId}
       onChange={e => this.setState({UserId: e.target.value})}
        />
        <button onClick={e => this.onInput(e)}>Login</button>
        <div className="login"></div>
      </div>
    )
  }
}
