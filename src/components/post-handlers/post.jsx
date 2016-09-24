import React from 'react';
import Modal from 'react-modal';
import request from 'superagent';

import PostView from './post_view.jsx';
import CommentList from '../comment-handlers/comment_list.jsx';

const propTypes = {
  post: React.PropTypes.object.isRequired,
  refreshList: React.PropTypes.func.isRequired,
};

export default class Post extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
      localVotes: 0,
    };
    this.postURL = `https://feedforward-968b7.firebaseio.com/posts/${this.props.post.id}`;
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.removePost = this.removePost.bind(this);
    this.addVote = this.addVote.bind(this);
  }

  componentDidMount () {
    this.setState({
      localVotes: this.props.post.votes,
    });
  }

  openModal() {
    this.setState({
      modalOpen: true,
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false,
    });
  }

  removePost () {
    request.del(this.postURL).then(() => {
      this.props.refreshList();
    });
  }

  addVote (increment) {
    this.props.post.votes += increment;
    request.post(this.postURL)
           .send(this.props.post)
           .then(() => {
              this.setState({
                localVotes: this.props.post.votes,
              });
           });
  }

  handleVote (e) {
    const voteType = e.target.name;
    const voteValue;
    if (voteType === 'upvote') {
      voteValue = 1;
    }
    else {
      voteValue = -1;
    }
    this.addVote(voteValue);
  }

  render () {
    return (
      <div>
        <PostView post={this.props.post} removePost={this.removePost} inModal={false} />
        <p onClick={this.openModal}>Click to vote and comment</p>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false}
          style={modalStyle} >

          <button addClass='close-button' onClick={this.closeModal}>X</button>
          <div addClass='voting-display'>
            <button name='downvote' addClass='vote-button' onClick{this.handleVote}>
              -</button>
            <h2>{this.state.localVotes}</h2>
            <button name='upvote' addClass='vote-button' onClick{this.handleVote}>
              +</button>
          </div>
          <PostView post={this.props.post} inModal={true} />
          <CommentList post-id={this.props.post.id} />
        </Modal>
      </div>
    );
  }
}

Post.propTypes = propTypes;
