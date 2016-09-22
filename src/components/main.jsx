nav links: signin/out, register, newpost, userlist, allposts
index view: allposts
goto alias: text input, on submit passes value to getIdByAlias, passes its return to redirect
  ^ separate component?
getIdByAlias: searches for uid matching alias passed as parameter

import React from 'react';
import {Link} from 'react-router';

export default class Main extends React.Component {
  constructor () {
    super();
    this.state = {
      loggedIn: false,
    };
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

  render () {
    return (

    );
  }
}
