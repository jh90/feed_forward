nav links: signin/out, register, newpost, userlist, allposts
index view: allposts
BONUS:
  goto alias: text input, on submit passes value to getIdByAlias, passes its return to redirect
  getIdByAlias: searches for uid matching alias passed as parameter

import React from 'react';
import {Link} from 'react-router';
import firebase from '../../firebase.config.js';

const propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default class Main extends React.Component {
  constructor () {
    super();
    this.state = {
      loggedIn: false,
    };
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount () {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged((user) => {
        this.setState({loggedIn: (user !== null),});
      });
    }, 200);
  }

  signOut () {
    firebase.auth()
      .signOut()
    //REMOVE LATER
      .then(() => {
        console.log('dey gon');
      });
  }

  toggleNavByAuthState () {
    if(!this.state.loggedIn) {
      return (
        <div id='nav-links'>
          <Link to '/users/all'>Browse Feeds</Link>
          <Link to='/login' id='login'>Login</Link>
          <Link to='/register' id='register'>Register</Link>
        </div>
      );
    }
    else {
      return (
        <div id='nav-links'>
          <Link to='/users/all'>Browse Feeds</Link>
          <Link to='/new_post'>New Post</Link>
          <Link to='/' onClick={this.signOut}>Sign Out</Link>
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        <h1 id='header'>fFW</h1>
        <div id='nav'>
          {
            this.toggleNavByLoginState();
          }
        </div>
        <div id='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = propTypes;
