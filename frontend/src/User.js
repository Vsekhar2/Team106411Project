import React from 'react';
import axios from 'axios';


let myData = null;
export default class User extends React.Component {

   //let myData = null;

   //Data that will be stored in the form and can be used
   state = {

     Name: "",
     Age: "",
     UserId: "",
     test: myData



   }

   //On Insert Function
   onInsert = (e) => {
      e.preventDefault();


      let sendData = JSON.stringify(this.state)
      axios.post("http://127.0.0.1:8000/api/user-insert/", sendData)
        .then((response) => {
          console.log("Returned response from Django: " + response.data)
        })
        .catch((error) => {
            console.log(error)
        })

      console.log("App Component got: ", this.state);



      //this.props.onSubmit(this.state);
      this.setState({

        Name: "",
        Age: "",
        UserId: ""


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
      axios.post("http://127.0.0.1:8000/api/user-delete/", sendData)
        .then((response) => {
           console.log("Returned response from Django: " + response.data)
      })
      .catch((error) => {
          console.log(error)
       })

       this.setState({

         Name: "",
         Age: "",
         UserId: ""


       })
     console.log("Deleted specific userId: ", this.state);




   };

   //On Update Function
   onUpdate = (e) => {
     console.log("On Update");
     e.preventDefault();
     console.log(this.state);


      let sendData = JSON.stringify(this.state)
      axios.post("http://127.0.0.1:8000/api/user-update/", sendData)
        .then((response) => {
           console.log("Returned response from Django: " + response.data)
      })
      .catch((error) => {
          console.log(error)
       })


       this.setState({

         Name: "",
         Age: "",
         UserId: ""


       })

     console.log("Updated specific userId: ", this.state);




   };



   //On Query Function
   onQuery = (e) => {
     console.log("On Query");
     e.preventDefault();
     //this.props.onSubmit(this.state)
     console.log(this.state);


      let sendData = JSON.stringify(this.state)
      //let responseData = null
      axios.post("http://127.0.0.1:8000/api/user-query/", sendData)
        .then((response) => {
           console.log("Returned response from Django: " + response.data)
           myData = JSON.stringify(response.data)
           this.setState({

             test: myData
           })
           console.log(myData)
      })
      .catch((error) => {
          console.log(error)
       })

       this.setState({

         Name: "",
         Age: "",
         UserId: "",



       })

     console.log("Query Success: ");




   };



   render() {

     return (

       <form>


          <label>User</label>
          <br />
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
            <button onClick={e => this.onInsert(e)}>Insert</button>
            <button onClick={e => this.onQuery(e)}>Query</button>
            <button onClick={e => this.onUpdate(e)}>Update</button>
            <button onClick={e => this.onDelete(e)}>Delete</button>

            <div>

                {this.state.test}

            </div>
            {/* TODO: Separate button operations */}
            {/* TODO: Experience UI etc. */}

       </form>



     )
   }
}
