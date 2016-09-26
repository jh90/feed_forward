
import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';

import Post from './post-handlers/post.jsx';

export default class UserList extends React.Component {
  getLastPostOfEachUser () {
    const postsURL = 'https://feedforwardt2.firebaseio.com/posts.json';
    request.get(postsURL).then((response) => {
      const allPosts = Array.from(response.body);
      allPosts.reverse();

      const usersAddedToList = [];
      const lastPosts = [];
      allPosts.forEach((post) => {
        if (!usersAddedToList.include(post.posterID)) {
          lastPosts.push(post);
          usersAddedToList.push(post.posterID);
        }
      });
      return lastPosts;
    });
  }

  render () {
    const samplePosts = this.getLastPostOfEachUser();
    const usersURL = 'https://feedforwardt2.firebaseio.com/users.json';
    let userAlias = '';
    return (
      <div>
        {
          samplePosts.map((post) => {
            request.get(usersURL).then((response) => {
              userAlias = response.body[post.posterID].alias;
              return (
                <div>
                  <Link to='/users/{post.posterID}' className='user-link'>{userAlias}</Link>
                  <Post post={post} />
                </div>
              );
            });
          })
        }
      </div>
    );
  }
}
