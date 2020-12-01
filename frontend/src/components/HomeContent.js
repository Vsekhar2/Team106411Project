import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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

  updateURL = fields => {

    console.log("App Component got: ", fields);

  }
  //getGameId, function should pull gameID, name, and single/Multiplayer
  //updateURL, generate url by concanating "https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.gameID + /capsule_616x353.jpg?t=1605831017"

  render() {

    return (
      <div className="content">

        <div className="cardWrap">
          <h1>Here are your recommended games!</h1>
            <div className="cardContainer">
              {/*game1*/}
              <Link to={"//store.steampowered.com/app/" + this.state.detail1.gameId}>
                <div className="card">
                  <div className="cardImg">
                    <img src= {"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.detail1.gameId + "/capsule_616x353.jpg?t=1605831017"}
                      alt = {this.state.detail1.name + " Pic"}/>
                  </div>
                  <div className="cardContent">
                    <h3>{this.state.detail1.name}</h3>
                  </div>
                </div>
              </Link>
              {/*game2*/}
              <Link to={"//store.steampowered.com/app/" + this.state.detail2.gameId}>
              <div className="card">
                <div className="cardImg">
                  <img src= {"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.detail2.gameId + "/capsule_616x353.jpg?t=1605831017"}
                    alt = {this.state.detail2.name + " Pic"}/>
                </div>
                <div className="cardContent">
                  <h3>{this.state.detail2.name}</h3>
                </div>
              </div>
              </Link>
              {/*game3*/}
              <Link to={"//store.steampowered.com/app/" + this.state.detail3.gameId}>
                <div className="card">
                  <div className="cardImg">
                    <img src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.detail3.gameId + "/capsule_616x353.jpg?t=1605831017"}
                      alt = {this.state.detail3.name + " Pic"}/>
                  </div>
                  <div className="cardContent">
                    <h3>{this.state.detail3.name}</h3>
                  </div>
                </div>
              </Link>
              {/*game4*/}
              <Link to={"//store.steampowered.com/app/" + this.state.detail4.gameId}>
                <div className="card">
                  <div className="cardImg">
                    <img src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.detail4.gameId + "/capsule_616x353.jpg?t=1605831017"}
                      alt = {this.state.detail4.name + " Pic"}/>
                  </div>
                  <div className="cardContent">
                    <h3>{this.state.detail4.name}</h3>
                  </div>
                </div>
              </Link>
              {/*game5*/}
              <Link to={"//store.steampowered.com/app/" + this.state.detail5.gameId}>
                <div className="card">
                  <div className="cardImg">
                    <img src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.detail5.gameId + "/capsule_616x353.jpg?t=1605831017"}
                      alt = {this.state.detail5.name + " Pic"}/>
                  </div>
                  <div className="cardContent">
                    <h3>{this.state.detail5.name}</h3>
                  </div>
                </div>
              </Link>
          </div>
        </div>


        <div className="cardWrap">
          <h2></h2>
          <div className="cardContainer">
            <Link to={"//store.steampowered.com/app/" + this.state.detail6.gameId}>
              <div className="card">
                <div className="cardImg">
                  <img src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.detail6.gameId + "/capsule_616x353.jpg?t=1605831017"}
                    alt = {this.state.detail6.name + " Pic"}
                    />
                </div>
                <div className="cardContent">
                  <h3>{this.state.detail6.name}</h3>
                </div>
              </div>
            </Link>
            <Link to={"//store.steampowered.com/app/" + this.state.detail7.gameId}>
              <div className="card">
                <div className="cardImg">
                  <img src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.detail7.gameId + "/capsule_616x353.jpg?t=1605831017"}
                    alt = {this.state.detail7.name + " Pic"}
                    />
                </div>
                <div className="cardContent">
                  <h3>{this.state.detail7.name}</h3>
                </div>
              </div>
            </Link>
            <Link to={"//store.steampowered.com/app/" + this.state.detail8.gameId}>
              <div className="card">
                <div className="cardImg">
                  <img src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.detail8.gameId + "/capsule_616x353.jpg?t=1605831017"}
                    alt = {this.state.detail8.name + " Pic"}
                    />
                </div>
                <div className="cardContent">
                  <h3>{this.state.detail8.name}</h3>
                </div>
              </div>
            </Link>
            <Link to={"//store.steampowered.com/app/" + this.state.detail9.gameId}>
              <div className="card">
                <div className="cardImg">
                  <img src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.detail9.gameId + "/capsule_616x353.jpg?t=1605831017"}
                    alt = {this.state.detail9.name + " Pic"}
                    />
                </div>
                <div className="cardContent">
                  <h3>{this.state.detail9.name}</h3>
                </div>
              </div>
            </Link>
            <Link to={"//store.steampowered.com/app/" + this.state.detail10.gameId}>
              <div className="card">
                <div className="cardImg">
                  <img src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.detail10.gameId + "/capsule_616x353.jpg?t=1605831017"}
                    alt = {this.state.detail10.name + " Pic"}
                    />
                </div>
                <div className="cardContent">
                  <h3>{this.state.detail10.name}</h3>
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
