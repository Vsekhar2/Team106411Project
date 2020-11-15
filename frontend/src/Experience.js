import React from 'react';
import axios from 'axios';


let myData = null;
export default class Experience extends React.Component {
  //Data that will be stored in the form and can be used
  state = {

    UserId: "",
    GameId: "",
    Ratings: "",
    myQueryData: myData,



  }

  //On Insert Function
  onInsert = (e) => {
     e.preventDefault();


     let sendData = JSON.stringify(this.state)
     axios.post("http://127.0.0.1:8000/api/experience-insert/", sendData)
       .then((response) => {
         console.log("Returned response from Django: " + response.data)
       })
       .catch((error) => {
           console.log(error)
       })

     console.log("App Component got: ", this.state);



     //this.props.onSubmit(this.state);
     this.setState({

       UserId: "",
       GameId: "",
       Ratings: ""


     })
     console.log(this.state);


  };

  //On Delete function {Called on Delete}
  onDelete = (e) => {
    console.log("On Delete");
    e.preventDefault();
    console.log(this.state);

     //Package state Data(text fields into Json format)
     let sendData = JSON.stringify(this.state)

     //Send data via API call
     axios.post("http://127.0.0.1:8000/api/experience-delete/", sendData)
       .then((response) => {
          console.log("Returned response from Django: " + response.data)
     })
     .catch((error) => {
         console.log(error)
      })


      this.setState({

        UserId: "",
        GameId: "",
        Ratings: ""


      })

    console.log("Deleted specific userId: ", this.state);




  };

  //On Update Function
  onUpdate = (e) => {
    console.log("On Update");
    e.preventDefault();
    console.log(this.state);


     let sendData = JSON.stringify(this.state)
     axios.post("http://127.0.0.1:8000/api/experience-update/", sendData)
       .then((response) => {
          console.log("Returned response from Django: " + response.data)
     })
     .catch((error) => {
         console.log(error)
      })

      this.setState({

        UserId: "",
        GameId: "",
        Ratings: ""


      })

    console.log("Deleted specific userId: ", this.state);




  };

  //On Query Function
  onQuery = (e) => {
    console.log("On Query");
    e.preventDefault();
    //this.props.onSubmit(this.state)
    console.log(this.state);


     let sendData = JSON.stringify(this.state)
     axios.post("http://127.0.0.1:8000/api/experience-query/", sendData)
       .then((response) => {
          console.log("Returned response from Django: " + response.data)
          myData = JSON.stringify(response.data)
          this.setState({

            myQueryData: myData
          })
     })
     .catch((error) => {
         console.log(error)
      })

      this.setState({

        UserId: "",
        GameId: "",
        Ratings: ""


      })

    console.log("Queried specific userId: ", this.state);




  };



  render() {

    return (

      <form>
        <label>Experience</label>
        <br />

         <input
         placeholder = "UserId: "
         value = {this.state.UserId}
         onChange={e => this.setState({UserId: e.target.value})}
          />

          <br />
          <input
          placeholder = "GameId: "
          value = {this.state.GameId}
          onChange={e => this.setState({GameId: e.target.value})}
           />

           <br />
           <input
           placeholder = "Ratings: "
           value = {this.state.Ratings}
           onChange={e => this.setState({Ratings: e.target.value})}
            />

           <br />
           <button onClick={e => this.onInsert(e)}>Insert</button>
           <button onClick={e => this.onQuery(e)}>Query</button>
           <button onClick={e => this.onUpdate(e)}>Update</button>
           <button onClick={e => this.onDelete(e)}>Delete</button>

           <div>

               {this.state.myQueryData}

           </div>
           {/* TODO: Separate button operations */}
           {/* TODO: Experience UI etc. */}

      </form>



    )
  }
}
