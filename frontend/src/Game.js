import React from 'react';
import axios from 'axios';

export default class Experience extends React.Component {
  //Data that will be stored in the form and can be used
  state = {
    
    GameId: "",
    Name: "",
    Price: "",
    Platform: "",
    Developer: ""

  }

  //On Insert Function
  onInsert = (e) => {
     e.preventDefault();


     let sendData = JSON.stringify(this.state)
     axios.post("http://127.0.0.1:8000/api/game-insert/", sendData)
       .then((response) => {
         console.log("Returned response from Django: " + response.data)
       })
       .catch((error) => {
           console.log(error)
       })

     console.log("App Component got: ", this.state);



     //this.props.onSubmit(this.state);
     this.setState({

        GameId: "",
        Name: "",
        Price: "",
        Platform: "",
        Developer: ""

     })
     console.log(this.state);


  };

  //On Update Function
  onUpdate = (e) => {
    console.log("On Update");
    e.preventDefault();
    console.log(this.state);


     let sendData = JSON.stringify(this.state)
     axios.post("http://127.0.0.1:8000/api/game-update/", sendData)
       .then((response) => {
          console.log("Returned response from Django: " + response.data)
     })
     .catch((error) => {
         console.log(error)
      })

      this.setState({

        GameId: "",
        Name: "",
        Price: "",
        Platform: "",
        Developer: ""

      })

    console.log("Deleted specific game: ", this.state);




  };

  //On Query Function
  onQuery = (e) => {
    console.log("On Update");
    e.preventDefault();
    //this.props.onSubmit(this.state)
    console.log(this.state);


     let sendData = JSON.stringify(this.state)
     axios.post("http://127.0.0.1:8000/api/game-query/", sendData)
       .then((response) => {
          console.log("Returned response from Django: " + response.data)
     })
     .catch((error) => {
         console.log(error)
      })

      this.setState({

        GameId: "",
        Name: "",
        Price: "",
        Platform: "",
        Developer: ""

      })

    console.log("Queried game: ", this.state);




  };



  render() {

    return (

      <form>
        <label>Game</label>

        <br />
        <input
        placeholder = "GameId: "
        value = {this.state.GameId}
        onChange={e => this.setState({GameId: e.target.value})}
        />

        <br />
        <input
        placeholder = "Name: "
        value = {this.state.Name}
        onChange={e => this.setState({Name: e.target.value})}
        />

        <br />
        <input
        placeholder = "Price: "
        value = {this.state.Price}
        onChange={e => this.setState({Price: e.target.value})}
        />

        <br />
        <input
        placeholder = "Platform: "
        value = {this.state.Platform}
        onChange={e => this.setState({Platform: e.target.value})}
        />

        <br />
        <input
        placeholder = "Developer: "
        value = {this.state.Developer}
        onChange={e => this.setState({Developer: e.target.value})}
        />

        <br />
        <button onClick={e => this.onInsert(e)}>Insert</button>
        <button onClick={e => this.onQuery(e)}>Query</button>
        <button onClick={e => this.onUpdate(e)}>Update</button>
        {/* TODO: Separate button operations */}
        {/* TODO: Experience UI etc. */}

      </form>



    )
  }
}
