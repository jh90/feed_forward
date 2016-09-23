dummy component
displays all in db/users by alias as Link to:/users/uid + [thumbnail of?] most recent post

import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';

const UserList = () => {
  return (
    <div>
      {
        const url = 'https://feedforward-968b7.firebaseio.com/users';
        request.get(url).then((response) => {
          response.map((user) => {
            <Link to=`/users/${user.id}` addClass='user-link'>{user.alias}</Link>
          });
        })
      }
    </div>
  );
}
