import React from 'react';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

export default class NewPostForm extends React.Component {
  constructor () {
    super();
    this.state = {
      posterID: '',
      posterAlias: '',
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
      posterID: firebase.auth().currentUser.uid,
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

  handleSubmit () {
    const baseURL = 'https://feedforwardt2.firebaseio.com/posts.json';
    request.post(baseURL).send(this.state);
  }

  render () {
    return (
      <div>
        <h1>New Post</h1>
        <div className='new-post-form'>
          <div>
            <label>Link:
            <input name='link' onChange={this.handleChange} type='text' placeholder='URL' />
            </label>
          </div>
          <div>
            <input name='text' onChange={this.handleChange} type='text' placeholder='Thoughts?' />
          </div>
          <input name='timestamp' onChange={this.handleChange} type='hidden' value={this.getTimestamp} />
          <button className='post-button' onClick={this.handleSubmit}>Submit Post</button>
        </div>
      </div>
    );
  }
}
