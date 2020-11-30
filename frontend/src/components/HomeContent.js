import React, { Component } from 'react';

class HomeContent extends Component {

  //create state for 10 different images, each will contain both a gameid, url id, name, and single/multiplayer
  constructor(props) {
    super(props);
    this.state = {
      recGameId: 0,
      detail1: {
        gameId: 0,
        url: "https://steamcdn-a.akamaihd.net/steam/apps/570/capsule_616x353.jpg?t=1605831017",
        name: "Dota 2",
        isSingleplayer: false
      },
      detail2: {
        gameId: 0,
        url: "https://steamcdn-a.akamaihd.net/steam/apps/730/capsule_616x353.jpg?t=1605831017",
        name: "CS:GO",
        isSingleplayer: false
      },
      detail3: {
        gameId: 0,
        url: "https://steamcdn-a.akamaihd.net/steam/apps/945360/capsule_616x353.jpg?t=1605831017",
        name: "Among Us",
        isSingleplayer: false
      },
      detail4: {
        gameId: 0,
        url: "",
        name: "default",
        isSingleplayer: false
      },
      detail5: {
        gameId: 0,
        url: "",
        name: "default",
        isSingleplayer: false
      },
      detail6: {
        gameId: 0,
        url: "",
        name: "default",
        isSingleplayer: false
      },
      detail7: {
        gameId: 0,
        url: "",
        name: "default",
        isSingleplayer: false
      },
      detail8: {
        gameId: 0,
        url: "",
        name: "default",
        isSingleplayer: false
      },
      detail9: {
        gameId: 0,
        url: "",
        name: "default",
        isSingleplayer: false
      },
      detail10: {
        gameId: 0,
        url: "",
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
          <h1>Multiplayer Games</h1>
            <div className="cardContainer">
              {/*game1*/}
              <div className="card">
                <div className="cardImg">
                  <img src= {this.state.detail1.url}
                    alt = "Dota2 Pic"/>
                </div>
                <div className="cardContent">
                  <h3>{this.state.detail1.name}</h3>
                </div>
              </div>
              {/*game2*/}
              <div className="card">
                <div className="cardImg">
                  <img src= {this.state.detail2.url}
                    alt = "Dota2 Pic"/>
                </div>
                <div className="cardContent">
                  <h3>{this.state.detail2.name}</h3>
                </div>
              </div>
              {/*game3*/}
              <div className="card">
                <div className="cardImg">
                  <img src={this.state.detail3.url}
                    alt = "Dota2 Pic"/>
                </div>
                <div className="cardContent">
                  <h3>{this.state.detail3.name}</h3>
                </div>
              </div>
              {/*game4*/}
              <div className="card">
                <div className="cardImg">
                  <img src={this.state.detail4.url}
                    alt = "Dota2 Pic"/>
                </div>
                <div className="cardContent">
                  <h3>{this.state.detail4.name}</h3>
                </div>
              </div>
              {/*game5*/}
              <div className="card">
                <div className="cardImg">
                  <img src={this.state.detail5.url}
                    alt = "Dota2 Pic"/>
                </div>
                <div className="cardContent">
                  <h3>{this.state.detail5.name}</h3>
                </div>
              </div>
            </div>
        </div>


        <div className="cardWrap">
          <h2>Singleplayer Games</h2>
          <div className="cardContainer">
            <div className="card">
              <div className="cardImg">
                <img src={this.state.detail6.url}
                  alt = "Dota2 Pic"
                  />
              </div>
              <div className="cardContent">
                <h3>{this.state.detail6.name}</h3>
              </div>
            </div>
            <div className="card">
              <div className="cardImg">
                <img src={this.state.detail7.url}
                  alt = "Dota2 Pic"
                  />
              </div>
              <div className="cardContent">
                <h3>{this.state.detail7.name}</h3>
              </div>
            </div>
            <div className="card">
              <div className="cardImg">
                <img src={this.state.detail8.url}
                  alt = "Dota2 Pic"
                  />
              </div>
              <div className="cardContent">
                <h3>{this.state.detail8.name}</h3>
              </div>
            </div>
            <div className="card">
              <div className="cardImg">
                <img src={this.state.detail9.url}
                  alt = "Dota2 Pic"
                  />
              </div>
              <div className="cardContent">
                <h3>{this.state.detail9.name}</h3>
              </div>
            </div>
            <div className="card">
              <div className="cardImg">
                <img src={this.state.detail10.url}
                  alt = "Dota2 Pic"
                  />
              </div>
              <div className="cardContent">
                <h3>{this.state.detail10.name}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeContent
