import React from 'react';
import {withRouter} from 'react-router';
import firebase from '../../firebase.config.js';

class Register extends React.Component {
  constructor () {
    super();
    this.state = {
      user: '',
      password: '',
      name: '',
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

  handleSubmit (e) {
    const {user, password, name} = this.state;
    firebase.auth()
            .createUserWithEmailAndPassword(user, password)
            .catch((err) => {
              console.log(`${err.code} ${err.message}`);
            })
            .then((registrant) => {
              firebase.database().ref('users')
                      .child(registrant.uid)
                      .set({alias: name, email: user})
            })
            .then(() => {
              this.props.router.push('/');
            });
  }

  render () {
    return (
      <div>
        <h1>Register</h1>
        <div id="register-form">
          <div>
            <input name="user" onChange={this.handleChange} type="text" placeholder="Username" />
          </div>
          <div>
            <input name="password" onChange={this.handleChange} type="password" placeholder="Password" />
          </div>
          <div>
            <input name="name" onChange={this.handleChange} type="text" placeholder="Alias"
          </div>
          <button className="auth-button" onClick={this.handleSubmit}>Register</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
