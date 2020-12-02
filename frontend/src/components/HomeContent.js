import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

let myData = null;

class HomeContent extends Component {

  //create state for 10 different images, each will contain both a gameid, url id, name, and single/multiplayer
  constructor(props) {
    super(props);
    this.state = {
      recGameId: 0,
      detail1: {
        gameId: 570,
        name: "Dota_2",
        isSingleplayer: false
      },
      detail2: {
        gameId: 730,
        name: "CS:GO",
        isSingleplayer: false
      },
      detail3: {
        gameId: 945360,
        name: "Among_Us",
        isSingleplayer: false
      },
      detail4: {
        gameId: 0,
        name: "default",
        isSingleplayer: false
      },
      detail5: {
        gameId: 0,
        name: "default",
        isSingleplayer: false
      },
      detail6: {
        gameId: 0,
        name: "default",
        isSingleplayer: false
      },
      detail7: {
        gameId: 0,
        name: "default",
        isSingleplayer: false
      },
      detail8: {
        gameId: 0,
        name: "default",
        isSingleplayer: false
      },
      detail9: {
        gameId: 0,
        name: "default",
        isSingleplayer: false
      },
      detail10: {
        gameId: 0,
        name: "default",
        isSingleplayer: false
      }

    };
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
   console.log(this.state.gameName1)

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

    searchUser = (e) => {
      var sendData = JSON.stringify({ "userId" : this.state.UserId });
      var config = {
           method: 'post',
           url: 'http://localhost:4000/API/userModel/query',
           headers: {
             'Content-Type': 'application/json'
           },
           data : sendData
        };
           
       axios(config)
       .then(function (response) {
         console.log(JSON.stringify(response.data));
       })
       .catch(function (error) {
         console.log(error);
       });
         console.log("Query Success: ");

    }

  //getGameId, function should pull gameID, name, and single/Multiplayer
  //updateURL, generate url by concanating "https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.gameID + /capsule_616x353.jpg?t=1605831017"

  render() {

    return (
      <div className="content">
        <br />

               <input
               placeholder = "UserId: "
               value = {this.state.UserId}
               onChange={e => this.setState({UserId: e.target.value}, () =>
                    { this.setState({
                            detail1 : {
                                        name : this.state.gameName1,
                                        gameId : this.state.steamId1
                                      }
                                    })
                    })
                }

                />
                <button onClick={e => this.onInput(e)}>Get Recommendations</button>
                <button onClick={e => this.PushToMongo(e)}>Save Results</button>
                <button onClick={e => this.searchUser(e)}>Search User</button>
                <div className="login"></div>
                <div>
                <h3>---------------------------------------------------</h3>
                </div>

        <div className="cardWrap">
          <h1>Here are your recommended games!</h1>
            <div className="cardContainer">
              {/*game1*/}
              <Link to={"//store.steampowered.com/app/" + this.state.steamId1}>
                <div className="card">
                  <div className="cardImg">
                    <img src= {"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.steamId1 + "/capsule_616x353.jpg?t=1605831017"}
                      alt = {this.state.gameName1+ " Pic"}/>
                  </div>
                  <div className="cardContent">
                    <h3>{this.state.gameName1}</h3>
                  </div>
                </div>
              </Link>
              {/*game2*/}
              <Link to={"//store.steampowered.com/app/" + this.state.steamId2}>
              <div className="card">
                <div className="cardImg">
                  <img src= {"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.steamId2 + "/capsule_616x353.jpg?t=1605831017"}
                    alt = {this.state.gameName2 + " Pic"}/>
                </div>
                <div className="cardContent">
                  <h3>{this.state.gameName2}</h3>
                </div>
              </div>
              </Link>
              {/*game3*/}
              <Link to={"//store.steampowered.com/app/" + this.state.steamId3}>
                <div className="card">
                  <div className="cardImg">
                    <img src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.steamId3 + "/capsule_616x353.jpg?t=1605831017"}
                      alt = {this.state.gameName3 + " Pic"}/>
                  </div>
                  <div className="cardContent">
                    <h3>{this.state.gameName3}</h3>
                  </div>
                </div>
              </Link>
              {/*game4*/}
              <Link to={"//store.steampowered.com/app/" + this.state.steamId4}>
                <div className="card">
                  <div className="cardImg">
                    <img src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.steamId4 + "/capsule_616x353.jpg?t=1605831017"}
                      alt = {this.state.gameName4 + " Pic"}/>
                  </div>
                  <div className="cardContent">
                    <h3>{this.state.gameName4}</h3>
                  </div>
                </div>
              </Link>
              {/*game5*/}
              <Link to={"//store.steampowered.com/app/" + this.state.steamId5}>
                <div className="card">
                  <div className="cardImg">
                    <img src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.steamId5 + "/capsule_616x353.jpg?t=1605831017"}
                      alt = {this.state.gameName5 + " Pic"}/>
                  </div>
                  <div className="cardContent">
                    <h3>{this.state.gameName5}</h3>
                  </div>
                </div>
              </Link>
          </div>
        </div>




      </div>
    )
  }
}

export default HomeContent
