import React from 'react';

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
        <hr className="my-4"/>
      </div>
    )
  }
}