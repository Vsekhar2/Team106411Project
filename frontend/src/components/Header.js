import React from 'react';
import axios from 'axios';

let myData = null;

export default class Header extends React.Component {
  state = {
    UserId: "",
  }

  // should call api to access MongoDB database, pull user recommendations
  onInput = (e) => {

    //Calling Reccomendation Engine
    let userID = JSON.stringify(this.state)
    var reccomendationArray = new Array(4)

    axios.post("http://127.0.0.1:8000/api/user-recommendations/", userID)
      .then((response) => {
         console.log("Returned response from Django: " + response.data)


          var steamId1 = response.data[0][0]
          var steamId2 = response.data[1][0]
          var steamId3 = response.data[2][0]
          var steamId4 = response.data[3][0]
          var steamId5 = response.data[4][0]

          var gameName1 = response.data[0][1]
          var gameName2 = response.data[1][1]
          var gameName3 = response.data[2][1]
          var gameName4 = response.data[3][1]
          var gameName5 = response.data[4][1]


         //console.log(tempData)
         myData = JSON.stringify(response.data)
         this.setState({
		 	steamId1 : steamId1,
		 	steamId2 : steamId2,
		 	steamId3 : steamId3,
		 	steamId4 : steamId4,
		 	steamId5 : steamId5,

			gameName1 : gameName1,
			gameName2 : gameName2,
			gameName3 : gameName3,
			gameName4 : gameName4,
			gameName5 : gameName5,

         })
         console.log(myData)
         console.log(myData[0])
    })
    .catch((error) => {
        console.log(error)
     })


 };

 PushToMongo = (e) => {

   //Post Reccomendation Results into MongoDB
   console.log(this.state.myReccomendationOne)

   /*var data = JSON.stringify({"tags":[this.state.steamId1, this.state.steamId2, this.state.steamId3, this.state.steamId4, this.state.steamId5],"firstName":"Joseph","lastName":"Test"});*/

	var data = JSON.stringify(
		{ 	"userId" : this.state.UserId,
			"gameNames":[this.state.gameName1, this.state.gameName2, this.state.gameName3, this.state.gameName4, this.state.gameName5],
			"steamIds":[this.state.steamId1, this.state.steamId2, this.state.steamId3, this.state.steamId4, this.state.steamId5]
		});

   var config = {
     method: 'post',
     url: 'http://localhost:4000/API/userModel',
     headers: {
       'Content-Type': 'application/json'
     },
     data : data
   };


   axios(config)
   .then(function (response) {
     console.log(JSON.stringify(response.data));
   })
   .catch(function (error) {
     console.log(error);
   });


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
        <button onClick={e => this.PushToMongo(e)}>Show Results</button>
        <div className="login"></div>
        <div>

            {this.state.gameName1}
            <br />
            {this.state.gameName2}
            <br />
            {this.state.gameName3}
            <br />
            {this.state.gameName4}
            <br />
            {this.state.gameName5}

        </div>
      </div>
    )
  }
}
