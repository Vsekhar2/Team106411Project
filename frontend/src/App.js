import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Form from "./Form";

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


  state = {

    fields: {}

  }

  onSubmit = fields => {

    this.setState({ fields }, () => {
      let sendData = JSON.stringify(this.state.fields)
      axios.post("http://127.0.0.1:8000/api/user-insert/", sendData)
        .then((response) => {
          console.log("Returned response from Django: " + response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    });
    console.log("App Component got: ", fields);

  }

  render() {
    return(
      <div className="dummy">
        <button onClick={this.ClickHandler}>Show Info!</button>
        <div className='form-container'>
          {(this.state.show) ? dummydata : null}
        </div>
        <Form onSubmit={fields => this.onSubmit(fields)} />
        <p>
        {JSON.stringify(this.state.fields, null, 2)}
        </p>
      </div>




    );
  }
}

export default App;
