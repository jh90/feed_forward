import React from 'react';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

import Comment from './comment.jsx';
import NewCommentForm from './new_comment_form.jsx';

const propTypes = {
  postID: React.PropTypes.string.isRequired,
};

export default class CommentList extends React.Component {
  constructor () {
    super();
    this.state = {
      comments: {},
      loggedIn: false,
    };
    this.getPostComments = this.getPostComments.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount () {
    this.getPostComments();
  }

  getPostComments () {
    const url = `https://feedforwardt2.firebaseio.com/posts/${this.props.post.id}`;
    request.get(url).then((response) => {
      this.setState({
        comments: response.body.comments,
      });
    });
  }

  deleteComment (cid) {
    const url = `https://feedforwardt2.firebaseio.com/posts/${this.props.post.id}/comments/${cid}`;
    request.del(url).then(() => {
      this.getPostComments();
    });
  }

  getCommenterAlias (comment) {
    const url = `https://feedforwardt2.firebaseio.com/users/${comment.submitterUID}`;
    request.get(url).then((response) => {
      return response.body.alias;
    });
  }

  render () {
    return (
      <div className='comments-wrapper'>
        <div className='comment-list'>
          {
            $.map(this.state.comments, (comment, cid) => {
              return (
                <Comment comment={comment}
                         commentID={cid}
                         commenter={this.getCommenterAlias(comment)}
                         deleteComment={this.deleteComment}
                         postID={this.props.postID}
                         key={cid}
                      />
              );
            })
          }
        </div>
        { firebase.auth().currentUser
          ? <NewCommentForm getPostComments={this.getPostComments} postID={this.props.postID} />
          : false }
      </div>
    );
  }
}

CommentList.propTypes = propTypes;
