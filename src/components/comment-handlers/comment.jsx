import React from 'react';
import firebase from '../../../firebase.config.js';

import RemoveButton from '../remove_button.jsx';

const propTypes = {
  comment: React.PropTypes.object.isRequired,
  commentID: React.PropTypes.string.isRequired,
  commenter: React.PropTypes.string.isRequired,
  deleteComment: React.PropTypes.func.isRequired,
};

export default class Comment extends React.Component {
  handleDelete () {
    this.props.deleteComment(this.props.commentID);
  }

  render () {
    return (
      <div className='comment'>
        <h4>{this.props.commenter} wrote on {this.props.comment.timestamp}</h4>
        <p>{this.props.comment.commentText}</p>
        { firebase.auth().currentUser.uid === this.props.comment.commenterID
          ? <RemoveButton remove={this.handleDelete} />
          : false }
      </div>
    );
  }
}

Comment.propTypes = propTypes;
