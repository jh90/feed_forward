import React from 'react';
import {withRouter} from 'react-router';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

class NewPostForm extends React.Component {
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

  getTimestamp () {
    const now = new Date();
    const date = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
    const time = `${now.getHours()}:${now.getMinutes()}`;
    return `${time} on ${date}`;
  }

  componentDidMount () {
    console.log(firebase.auth().currentUser.uid);
    console.log(firebase.auth().currentUser.displayName);
    this.setState({
      posterID: firebase.auth().currentUser.uid,
      timestamp: this.getTimestamp(),
      posterAlias: firebase.auth().currentUser.displayName,
    });
  }

  handleChange (e) {
    const inputState = {};
    const inputKey = e.target.name;
    inputState[inputKey] = e.target.value;
    this.setState(inputState);
  }

  handleSubmit () {
    console.log(this.state);
    const baseURL = 'https://feedforwardt2.firebaseio.com/posts.json';
    request.post(baseURL).send(this.state).then((response) => {
      this.props.router.push('/');
    });
  }

  render () {
    return (
      <div>
        <h1>New Post</h1>
        <form id='post-form'>
          <input id='link-field' name='link' onChange={this.handleChange} type='text' placeholder='URL' />
          <input id='text-field' name='text' onChange={this.handleChange} type='text' placeholder='Thoughts?' />
        </form>
        <button className='post-button' onClick={this.handleSubmit}>Submit Post</button>
      </div>
    );
  }
}

export default withRouter(NewPostForm);
