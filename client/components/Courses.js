import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import config from '../../server/config/default';
import './LiveStreams.scss';

export default class Courses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      course_list: []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:' + config.server.port + '/coursesAPI')
      .then(res => {
        this.setState({
          course_list: res.data
        });
      });
  }

  render() {
    const tutorials = this.state.course_list.map(tutorial => {
      return (
        <div className="stream col-xs-12 col-sm-12 col-md-3 col-lg-4" key={tutorial._id}>
          <Link to={'/tutorial/' + tutorial.upload_title}>
            <div className="stream-thumbnail">
              <img src={tutorial.thumbnail_path} />
            </div>
          </Link>
          <span className="username">
            <Link to={'/tutorial/' + tutorial.upload_title}>
              {tutorial.uploader_name}
            </Link>
          </span>
          <span className="video-title">{tutorial.upload_title.replace(/_/g, ' ')}</span>
        </div>
      );
    });

    return (
      <div className="container mt-5">
        <h4>Courses</h4>
        <hr className="my-4" />

        <div className="streams row">
          {tutorials}
        </div>
      </div>
    )
  }
}