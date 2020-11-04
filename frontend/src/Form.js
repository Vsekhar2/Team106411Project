import React from 'react';
import axios from 'axios';

export default class Form extends React.Component {
   state = {

     Name: "",
     Age: "",
     UserId: "",



   }

   onSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit(this.state);
      this.setState({

        Name: "",
        Age: "",
        UserId: ""


      })
      console.log(this.state);


   };

   //On Delete function
   onDelete = (e) => {
     console.log("On Delete");
     e.preventDefault();
     //this.props.onSubmit(this.state)
     console.log(this.state);


      let sendData = JSON.stringify(this.state)
      axios.post("http://127.0.0.1:8000/api/user-delete/", sendData)
        .then((response) => {
           console.log("Returned response from Django: " + response.data)
      })
      .catch((error) => {
          console.log(error)
       })

     console.log("Deleted specific userId: ", this.state);




   };

   //On Update Function
   onUpdate = (e) => {
     console.log("On Update");
     e.preventDefault();
     //this.props.onSubmit(this.state)
     console.log(this.state);


      let sendData = JSON.stringify(this.state)
      axios.post("http://127.0.0.1:8000/api/user-update/", sendData)
        .then((response) => {
           console.log("Returned response from Django: " + response.data)
      })
      .catch((error) => {
          console.log(error)
       })

     console.log("Deleted specific userId: ", this.state);




   };

   //On Query Function
   onQuery = (e) => {
     console.log("On Update");
     e.preventDefault();
     //this.props.onSubmit(this.state)
     console.log(this.state);


      let sendData = JSON.stringify(this.state)
      axios.post("http://127.0.0.1:8000/api/user-update/", sendData)
        .then((response) => {
           console.log("Returned response from Django: " + response.data)
      })
      .catch((error) => {
          console.log(error)
       })

     console.log("Deleted specific userId: ", this.state);




   };



   render() {

     return (

       <form>

          <input
          placeholder = "Name: "
          value = {this.state.Name}
          onChange={e => this.setState({Name: e.target.value})}
           />

           <br />
           <input
           placeholder = "Age: "
           value = {this.state.Age}
           onChange={e => this.setState({Age: e.target.value})}
            />

            <br />
            <input
            placeholder = "UserId: "
            value = {this.state.UserId}
            onChange={e => this.setState({UserId: e.target.value})}
             />

            <br />
            <button onClick={e => this.onSubmit(e)}>Insert</button>
            <button onClick={e => this.onSubmit(e)}>Query</button>
            <button onClick={e => this.onUpdate(e)}>Update</button>
            <button onClick={e => this.onDelete(e)}>Delete</button>
            {/* TODO: Separate button operations */}
            {/* TODO: Experience UI etc. */}

       </form>



     )
   }
}
