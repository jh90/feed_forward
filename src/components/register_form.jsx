import React from 'react';
import {withRouter, Link} from 'react-router';
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

  handleSubmit () {
    const {user, password, name} = this.state;
    console.log(this.state);
    console.log(name);
    firebase.auth()
            .createUserWithEmailAndPassword(user, password)

            .then((registrant) => {
              registrant.updateProfile({displayName: name});
              firebase.database().ref('users')
                      .child(registrant.uid)
                      .set({displayName: name, email: user, id: registrant.uid})
            })
            .then(() => {
              this.props.router.push('/');
            });
  }

  render () {
    return (
      <div id='register'>
        <h1 id='register-header'>Register</h1>
        <div className='register-form'>
          <div>
            <input className='register-field' name="user" onChange={this.handleChange} type="text" placeholder="Email" />
          </div>
          <div>
            <input className='register-field' name="password" onChange={this.handleChange} type="password" placeholder="Password" />
          </div>
          <div>
            <input className='register-field' name="name" onChange={this.handleChange} type="text" placeholder="Alias" />
          </div>
          <button className="auth-button" onClick={this.handleSubmit}>Sign Up!</button>
        </div>
        <Link className='home-button' to='/' id='back-to-main'>Home</Link>
      </div>
    );
  }
}

export default withRouter(Register);
