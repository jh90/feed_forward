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
        <ul id='opt-table'>
          <li className='main-link-items'><Link to='/login' className='main-links'>Login</Link></li>
          <li className='main-link-items'><Link to='/register' className='main-links'>Register</Link></li>
        </ul>
      );
    }
    else {
      return (
        <div id='opt-table'>
          <li className='main-link-items'><Link to='/new_post' className='main-links'>New Post
          </Link></li>
          <li className='main-link-items'><Link to='/' onClick={this.signOut} className='main-links'>Sign Out
          </Link></li>
        </div>
      );
    }
  }

  toggleNavByLocation () {
    if(this.props.location.pathname !== '/') {
      return (
        <ul id='nav-table'>
          <li className='main-link-items'><Link to='/' className='main-links'>All Posts
          </Link></li>
          <li className='main-link-items'><Link to='main/users/all' className='main-links'>Browse Feeds
          </Link></li>
        </ul>
      );
    }
    else {
      return (
        <ul id='nav-table'>
          <li className='main-links'><Link to='main/users/all' className='main-links'>Browse Feeds</Link></li>
        </ul>
      );
    }
  }

  render () {
    return (
      <div>
        <div id='tools'>
          {this.toggleOptionsByAuthState()}
          {this.toggleNavByLocation()}
        </div>
        <div id='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = propTypes;
