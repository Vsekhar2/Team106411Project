import React, { Component } from 'react';
import User from "../User";
import Experience from "../Experience";
import Game from "../Game";

let dummydata = null;

const SurveyContent = () => {
  return (
    <div className="SurveyContent">
      Survey
      <div className='form-container'>
        {(this.state.show) ? dummydata : null}
      </div>
      <User onSubmit={fields => this.onSubmit(fields)} />
      <br />
      <Experience onSubmit={fields => this.onSubmit(fields)} />
      <br />
      <Game onSubmit={fields => this.onSubmit(fields)} />
      <p>
      {JSON.stringify(this.state.fields, null, 2)}
      </p>
    </div>
  )
}

export default SurveyContent
