import React from 'react';
import axios from 'axios';

import config from '../../server/config/default';

export default class Courses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  fileChangeHandler(event) {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  }

  fileUploadHandler(event) {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    axios.post('http://127.0.0.1:' + config.server.port + '/upload', data)
      .then(response => {
        console.log(response.statusText);
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <h4>Upload Course</h4>
        <hr className="my-4"/>

        <input type="file" name="file" onChange={this.fileChangeHandler.bind(this)} />
        <button 
          type="button" 
          className="btn btn-success btn-block" 
          onClick={this.fileUploadHandler.bind(this)}>Upload File
        </button>
      </div>
    )
  }
}