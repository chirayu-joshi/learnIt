import React from "react";
import {Router, Route} from 'react-router-dom';

import Navbar from './Navbar';
import LiveStreams from './LiveStreams';
import Courses from './Courses';
import UploadCourse from './UploadCourse';
import Settings from './Settings';
import LiveStreamPlayer from './LiveStreamPlayer';
import VideoPlayer from './VideoPlayer';

const customHistory = require("history").createBrowserHistory();

export default class Root extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <Router history={customHistory} >
        <div>
          <Navbar/>
          <Route exact path="/" render={props => (
            <LiveStreams  {...props} />
          )} />

          <Route exact path="/tutorials" render={props => (
            <Courses {...props} />
          )} />

          <Route exact path="/upload-course" render={props => (
            <UploadCourse {...props} />
          )} />

          <Route exact path="/stream/:username" render={props => (
            <LiveStreamPlayer {...props} />
          )} />

          <Route exact path="/tutorial/:videoTitle" render={props => (
            <VideoPlayer {...props} />
          )} />

          <Route exact path="/settings" render={props => (
            <Settings {...props} />
          )} />
        </div>
      </Router>
    )
  }
}