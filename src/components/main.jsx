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
    this.render = this.render.bind(this);
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
      .then(() => {
        console.log('dey gon');
      });
  }

  toggleOptionsByAuthState () {
    if(!this.state.loggedIn) {
      return (
        <div className='opt-links'>
          <Link to='/login' id='login'>Login</Link>
          <Link to='/register' id='register'>Register</Link>
        </div>
      );
    }
    else {
      return (
        <div className='opt-links'>
          <Link to='/new_post'>New Post</Link>
          <Link to='/' onClick={this.signOut}>Sign Out</Link>
        </div>
      );
    }
  }

  toggleNavByLocation () {
    if(this.props.location.pathname !== '/') {
      return (
        <div className='nav-links'>
          <Link to='/'>All Posts</Link>
          <Link to='/users/all'>Browse Feeds</Link>
        </div>
      );
    }
    else {
      return (
        <div className='nav-links'>
          <Link to='/users/all'>Browse Feeds</Link>
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        <h1>fFW</h1>
        <div>
          {this.toggleOptionsByAuthState()}
          {this.toggleNavByLocation()}
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = propTypes;
