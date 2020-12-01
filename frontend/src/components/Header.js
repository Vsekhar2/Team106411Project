import React from 'react';
import axios from 'axios';

let myData = null;

export default class Header extends React.Component {
  state = {
    userId: ""
  }

  onInput = (e) => {
    console.log("UserID Selected")
    e.preventDefault();
    console.log(this.state);

    //add API to send userName to build out mainpage
    let sendData = JSON.stringify(this.state)
    axios.post("", sendData)
      .then((response) => {
         console.log("Returned response from Django: " + response.data)
         myData = JSON.stringify(response.data)
         this.setState({

           myUserData: myData
         })
    })
    .catch((error) => {
        console.log(error)
     })

     this.setState({

       UserId: "",
     })

   console.log("Select UserID ", this.state);
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
