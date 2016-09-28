
import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';

import Post from './post-handlers/post.jsx';

export default class UserList extends React.Component {
  constructor () {
    super();
    this.state = {
      mostRecentUserPosts: {},
    };
  }

  componentDidMount () {
    this.getLastPostOfEachUser();
  }

  getLastPostOfEachUser () {
    const postsURL = 'https://feedforwardt2.firebaseio.com/posts.json';
    request.get(postsURL).then((response) => {
      const allPosts = response.body;
      const usersAddedToList = [];
      const lastPosts = {};
      $.each(allPosts, (postID, post) => {
        if (!usersAddedToList.includes(post.posterID)) {
          usersAddedToList.push(post.posterID);
          lastPosts[postID] = post;
        }
      });
      this.setState({
        mostRecentUserPosts: lastPosts,
      });
    });
  }

  render () {
    const usersURL = 'https://feedforwardt2.firebaseio.com/users.json';
    let poster = '';
    let userAlias = '';
    const elements = $.map(this.state.mostRecentUserPosts, (post, postID) => {
      const path = `/main/users/${post.posterID}`;
      return (
        <div id='user-entry'>
          <Link to={path}>{post.posterAlias}</Link>
          <Post post={post} postID={postID} refreshList={this.getLastPostOfEachUser}/>
        </div>
      );
    });
    return (
      <div className='dummy'>
        {elements}
      </div>
    );
  }
}
