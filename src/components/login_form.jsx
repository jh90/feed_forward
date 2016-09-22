import React from 'react';
import firebase from '../../firebase.config.js';

export default class Login extends React.Component {
  constructor () {
    super();
    this.state = {
      user: '',
      password: '',
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
    const {user, password} = this.state;
    firebase.auth()
      .signInWithEmailAndPassword(user, password)
      .catch((err) => {
    //LATER: change from console.log to alert/pagemessage/..?
        console.log(`${err.code} ${err.message}`);
      })
      .then(() => {
        this.props.router.push('/');
      });
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <div id="login-form">
          <div>
            <input name="user" onChange={this.handleChange} type="text" placeholder="Email" />
          </div>
          <div>
            <input name="password" onChange={this.handleChange} type="password" placeholder="Password" />
          </div>
          <button className="auth-button" onClick={this.handleSubmit}>Login</button>
        </div>
      </div>
    );
  }
}
