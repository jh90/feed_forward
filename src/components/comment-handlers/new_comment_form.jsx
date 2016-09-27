import React from 'react';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

const propTypes = {
  getPostComments: React.PropTypes.func.isRequired,
  postID: React.PropTypes.string.isRequired,
};

export default class NewCommentForm extends React.Component {
  constructor () {
    super();
    this.state = {
      commentText: '',
      timestamp: '',
      submitterUID: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.setState({
      submitterUID: firebase.auth().currentUser.uid,
      timestamp: this.getTimestamp(),
    });
  }

  handleChange (e) {
    const inputState = {};
    const inputKey = e.target.name;
    inputState[inputKey] = e.target.value;
    this.setState(inputState);
  }

  handleSubmit () {
    firebase.database().ref(`posts/${this.props.postID}/comments`).push(this.state);
  }

  getTimestamp () {
    const now = new Date();
    const date = `${now.getDate()} / ${now.getMonth()+1} / ${now.getFullYear()}`;
    const time = `${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}`;
    return `${date} @ ${time}`;
  }

  render () {
    return (
      <div>
        <h3>New Comment</h3>
        <div className="comment-form">
          <input name="commentText" onChange={this.handleChange} type="text"
                 placeholder="Post a comment" />
          <button className="comment-button" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

NewCommentForm.propTypes = propTypes;
