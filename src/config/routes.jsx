import React from 'react';
import {Router, Route, IndexRedirect, IndexRoute, hashHistory} from 'react-router';

import Main from '../components/main.jsx';
import Feed from '../components/feed.jsx';
import UserList from '../components/user_list.jsx';
import LoginForm from '../components/login_form.jsx';
import RegisterForm from '../components/register_form.jsx';
import NewPostForm from '../components/post-handlers/new_post_form.jsx';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path='/'>
        <IndexRedirect to='main' />
        <Route path='main' component={Main} >
          <IndexRoute component={Feed} />
          <Route path='users' >
            <Route path='all' component={UserList} />
            <Route path=':uid' component={Feed} />
          </Route>
        </Route>
        <Route path='login' component={LoginForm} />
        <Route path='register' component={RegisterForm} />
        <Route path='new_post' component={NewPostForm} />
      </Route>
    </Router>
  );
};

export default Routes;
