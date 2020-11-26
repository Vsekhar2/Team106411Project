import React, { Component } from 'react';

const HomeContent = () => {
  return (
    <div className="content">

      <div className="cardWrap">
        <h1>Multiplayer Games</h1>
          <div className="cardContainer">
            <div className="card">
              <div className="cardImg">
                <img src="https://steamcdn-a.akamaihd.net/steam/apps/570/capsule_616x353.jpg?t=1605831017"
                  alt = "Dota2 Pic"/>
              </div>
              <div className="cardContent">
                <h3>Dota 2</h3>
              </div>
            </div>
            <div className="card">
              <div className="cardImg">
                <img src="https://steamcdn-a.akamaihd.net/steam/apps/730/capsule_616x353.jpg?t=1605831017"
                  alt = "Dota2 Pic"/>
              </div>
              <div className="cardContent">
                <h3>CS:GO</h3>
              </div>
            </div>
            <div className="card">
              <div className="cardImg">
                <img src="https://steamcdn-a.akamaihd.net/steam/apps/945360/capsule_616x353.jpg?t=1605831017"
                  alt = "Dota2 Pic"/>
              </div>
              <div className="cardContent">
                <h3>Among Us</h3>
              </div>
            </div>
            <div className="card">
              <div className="cardImg">
                <img src="https://steamcdn-a.akamaihd.net/steam/apps/1085660/capsule_616x353.jpg?t=1605831017"
                  alt = "Dota2 Pic"/>
              </div>
              <div className="cardContent">
                <h3>Destiny 2</h3>
              </div>
            </div>
            <div className="card">
              <div className="cardImg">
                <img src="https://steamcdn-a.akamaihd.net/steam/apps/578080/capsule_616x353.jpg?t=1605831017"
                  alt = "Dota2 Pic"/>
              </div>
              <div className="cardContent">
                <h3>PUBG</h3>
              </div>
            </div>
          </div>
      </div>


      <div className="cardWrap">
        <h2>Singleplayer Games</h2>
        <div className="cardContainer">
          <div className="card">
            <div className="cardImg">
              <img src="https://steamcdn-a.akamaihd.net/steam/apps/292030/capsule_616x353.jpg?t=1605831017"
                alt = "Dota2 Pic"
                />
            </div>
            <div className="cardContent">
              <h3>The Witcher 3: Wild Hunt</h3>
            </div>
          </div>
          <div className="card">
            <div className="cardImg">
              <img src="https://steamcdn-a.akamaihd.net/steam/apps/72850/capsule_616x353.jpg?t=1605831017"
                alt = "Dota2 Pic"
                />
            </div>
            <div className="cardContent">
              <h3>The Elder Scrolls: Skyrim</h3>
            </div>
          </div>
          <div className="card">
            <div className="cardImg">
              <img src="https://steamcdn-a.akamaihd.net/steam/apps/1091500/capsule_616x353.jpg?t=1605831017"
                alt = "Dota2 Pic"
                />
            </div>
            <div className="cardContent">
              <h3>Cyberpunk 2077</h3>
            </div>
          </div>
          <div className="card">
            <div className="cardImg">
              <img src="https://steamcdn-a.akamaihd.net/steam/apps/377160/capsule_616x353.jpg?t=1605831017"
                alt = "Dota2 Pic"
                />
            </div>
            <div className="cardContent">
              <h3>Fallout 4</h3>
            </div>
          </div>
          <div className="card">
            <div className="cardImg">
              <img src="https://steamcdn-a.akamaihd.net/steam/apps/205100/capsule_616x353.jpg?t=1605831017"
                alt = "Dota2 Pic"
                />
            </div>
            <div className="cardContent">
              <h3>Dishonored</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeContent
