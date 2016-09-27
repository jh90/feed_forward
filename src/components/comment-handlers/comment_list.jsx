import React from 'react';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

import Comment from './comment.jsx';
import NewCommentForm from './new_comment_form.jsx';

const propTypes = {
  postID: React.PropTypes.string.isRequired,
  post: React.PropTypes.object,
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
    const path = `posts/${this.props.postID}/comments/`;
    const postRef = firebase.database().ref(path);
    postRef.on('value', (snapshot) => {
      this.setState({
        comments: snapshot.val(),
      });
    });
  }

  deleteComment (cid) {
    const commentRef = firebase.database().ref(`posts/${this.props.postID}/comments/${cid}`);
    commentRef.remove();
  }

  getCommenterAlias () {
    return firebase.auth().currentUser.displayName;
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
                         commenter={this.getCommenterAlias()}
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
