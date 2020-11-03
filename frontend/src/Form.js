import React from 'react';

export default class Form extends React.Component {
   state = {

     Name: "",
     Age: "",
     UserId: "",



   }

   onSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit(this.state)
      this.setState({

        Name: "",
        Age: "",
        UserId: ""


      })
      console.log(this.state);


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
            <button onClick={e => this.onSubmit(e)}>Update</button>
            <button onClick={e => this.onSubmit(e)}>Delete</button>

       </form>



     )
   }
}
