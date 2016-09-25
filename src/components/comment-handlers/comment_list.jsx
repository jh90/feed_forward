import React from 'react';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

import Comment from './comment.jsx';
import NewCommentForm from './new_comment_form.jsx';

const propTypes = {
  post-id: React.PropTypes.string.isRequired,
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
    const url = `https://feedforward-968b7.firebaseio.com/posts/${this.props.post.id}`;
    request.get(url).then((response) => {
      this.setState({
        comments: response.body.comments,
      });
    });
  }

  deleteComment () {
    const url = `https://feedforward-968b7.firebaseio.com/posts/${this.props.post.id}/comments/${cid}`;
    request.del(url).then(() => {
      this.getPostComments();
    });
  }

  getCommenterAlias (comment) {
    const url = `https://feedforward-968b7.firebaseio.com/users/${comment.commenter-uid}`;
    request.get(url).then((response) => {
      return response.body.alias;
    });
  }

  render () {
    return (
      <div addClass='comments-wrapper'>
        <div addClass='comment-list'>
          {
            this.state.comments.map((comment, cid) => {
              return (
                <Comment comment={comment}
                         comment-id={cid}
                         commenter={this.getCommenterAlias(comment)}
                         deleteComment={this.deleteComment}
                      />
              );
            });
          }
        </div>
        { firebase.auth().currentUser
          ? <NewCommentForm getPostComments={this.getPostComments} post-id={this.props.post-id} />
          : false }
      </div>
    );
  }
}

CommentList.propTypes = propTypes;
