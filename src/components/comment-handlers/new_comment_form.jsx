BONUS: allow comments to reply to other comments -
  state{inreplyto:[null]}
    => pass to NewCommentForm
      =>post via third hidden input, but also if!null display text indicating target
  CommentList.setReplyTarget(alias)
    => pass to Comment

import React from 'react';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

const propTypes = {
  getPostComments: React.PropTypes.func.isRequired,
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

  handleChange (e) {
    const inputState = {};
    const inputKey = e.target.name;
    inputState[inputKey] = e.target.value;
    this.setState(inputState);
  }

  handleSubmit () {
    const url = `https://feedforward-968b7.firebaseio.com/posts/${this.props.post.id}/comments.json`;
    request.post(url).send(this.state).then(() => {
      this.props.getPostComments();
    });
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
        <div id="comment-form">
          <div>
            <input name="commentText" onChange={this.handleChange} type="text"
                   placeholder="Post a comment" />
            <input name="submitterUID" onChange={this.handleChange} type="hidden"
                   value={firebase.auth().currentUser.uid} />
            <input name="timestamp" onChange={this.handleChange} type="hidden"
                   value={this.getTimestamp} />
          </div>
          <button className="comment-button" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

NewCommentForm.propTypes = propTypes;
