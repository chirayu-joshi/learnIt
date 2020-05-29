import React from 'react';
import videojs from 'video.js';
import axios from 'axios';

import config from '../../server/config/default';

class VideoPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      videoJsOptions: null
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:' + config.server.port + '/coursesAPI')
      .then(res => {
        res.data.map(course => {
          if (course.upload_title === this.props.match.params.videoTitle) {
            this.setState({
              loaded: true,
              videoJsOptions: {
                autoplay: false,
                controls: true,
                sources: [{
                  src: course.video_path
                }],
                fluid: true
              }
            }, () => {
              this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
                // console.log('onPlayerReady', this)
              });
            });
          }
        });
      });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
          {this.state.loaded ? (
            <div data-vjs-player>
              <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered" />
            </div>
          ) : ' Loading ... '}
        </div>
      </div>
    );
  }

}

export default VideoPlayer;
