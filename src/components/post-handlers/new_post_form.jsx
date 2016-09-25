import React from 'react';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

export default class NewPostForm extends React.Component {
  constructor () {
    super();
    this.state = {
      poster-id: '',
      poster-alias: '',
      link: '',
      text: '',
      timestamp: '',
      votes: 0,
      comments: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.setState({
      poster-id: firebase.auth().currentUser.uid;
    });
  }

  handleChange (e) {
    const inputState = {};
    const inputKey = e.target.name;
    inputState[inputKey] = e.target.value;
    this.setState(inputState);
  }

  getTimestamp () {
    const now = new Date();
    const date = `${now.getDate()} / ${now.getMonth()+1} / ${now.getFullYear()}`;
    const time = `${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}`;
    return `${time} on ${date}`;
  }

  getPosterAlias () {
    const url = `https://feedforward-968b7.firebaseio.com/users/${poster-id}`;
    request.get(url).then((response) => {
      return response.body.alias;
    });
  }

  handleSubmit () {
    const baseURL = 'https://feedforward-968b7.firebaseio.com/posts.json';
    const postID;
    request.post(baseURL).send(this.state)
                         .then((response) => {
                            postID = response.name;
                         });
    const postURL = `https://feedforward-968b7.firebaseio.com/posts/${id}`;
    request.post(postURL).send({id: postID});
  }

  render () {
    return (
      <div>
        <h1>New Post</h1>
        <div addClass='new-post-form'>
          <div>
            <label>Link:
            <input name='link' onChange={this.handleChange} type='text' placeholder='URL' />
            </label>
          </div>
          <div>
            <input name='text' onChange={this.handleChange} type='text' placeholder='Thoughts?' />
          </div>
          <input name='poster-alias' onChange={this.handleChange} type='hidden' value={this.getPosterAlias} />
          <input name='timestamp' onChange={this.handleChange} type='hidden' value={this.getTimestamp} />
          <button addClass='post-button' onClick={this.handleSubmit}>Submit Post</button>
        </div>
      </div>
    );
  }
}
