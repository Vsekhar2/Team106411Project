import React, { Component } from 'react';
import HomeContent from '../components/HomeContent';
import SurveyContent from '../components/SurveyContent';
import SearchContent from '../components/SearchContent';
import {Switch, Route} from 'react-router-dom';

const Main = () => {
  return (
    <div className="main">
      <div className="header">
        TODO: Back/Forward Icon and Login
        <div className="login"></div>
      </div>
      <div className="pageContent">
        <Switch>
          <Route path="/" exact component={HomeContent}></Route>
          <Route path="/Survey" component={SurveyContent}></Route>
          <Route path="/Search" component={SearchContent}></Route>
        </Switch>
      </div>
    </div>
  )
}

export default Main
