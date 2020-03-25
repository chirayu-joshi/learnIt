import React from 'react';
import './LiveStreams.scss';

export default class Courses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      course_list: []
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <h4>Courses</h4>
        <hr className="my-4" />

        <div className="streams row">
          <div className="stream col-xs-12 col-sm-12 col-md-3 col-lg-4">
            <div className="stream-thumbnail">
              <img src={'http://127.0.0.1:3333/courses/video_thumbnails/1.%20Introduction.jpg'} />
            </div>
            <span className="username">
              <a href="#">
                chirayu
              </a>
            </span>
          </div>
        </div>
      </div>
    )
  }
}