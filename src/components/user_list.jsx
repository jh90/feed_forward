import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';

import Post from './post-handlers/post.jsx';

export default class UserList extends React.Component {
  getLastPostOfEachUser () {
    const postsURL = 'https://feedforward-968b7.firebaseio.com/posts';
    request.get(postsURL).then((response) => {
      const allPosts = Array.from(response.body);
      allPosts.reverse();

      const usersAddedToList = [];
      const lastPosts = [];
      allPosts.forEach((post) => {
        if (!usersAddedToList.include(post.poster-id)) {
          lastPosts.push(post);
          usersAddedToList.push(post.poster-id);
        }
      });
      return lastPosts;
    });
  }

  render () {
    return (
      <div>
        {
          const samplePosts = this.getLastPostOfEachUser();
          const usersURL = 'https://feedforward-968b7.firebaseio.com/users';
          samplePosts.map((post) => {
            const userAlias;
            request.get(usersURL).then((response) => {
              userAlias = response.body[post.poster-id].alias;
            });
            return (
              <Link to=`/users/${post.poster-id}` className='user-link'>{userAlias}</Link>
              <Post post={post} />
            );
          })
        }
      </div>
    );
  }
}
