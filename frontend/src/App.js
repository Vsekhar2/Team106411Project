import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

let dummydata = null;

class App extends Component {
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

  render() {
    return(
      <div className="dummy">
        <button onClick={this.ClickHandler}>Show Info!</button>
        <div className='form-container'>
          {(this.state.show) ? dummydata : null}
        </div>
      </div>
    );
  }
}

export default App;
