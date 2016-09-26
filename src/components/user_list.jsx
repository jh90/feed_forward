
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
    return (
      <div>
        {
          $.map(this.state.mostRecentUserPosts, (post, postID) => {
            request.get(usersURL).then((response) => {
              poster = response.body[post.posterID];
              userAlias = poster.alias;
            })
            .then(() => {
              return (
                <div>
                  <Link to='/users/{post.posterID}' className='user-link'>{userAlias}</Link>
                  <Post post={post} postID={postID} refreshList={this.getLastPostOfEachUser} />
                </div>
              );
            });
          })
        }
      </div>
    );
  }
}
