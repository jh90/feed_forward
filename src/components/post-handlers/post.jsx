import React from 'react';
import Modal from 'react-modal';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

import PostView from './post_view.jsx';
import CommentList from '../comment-handlers/comment_list.jsx';

const propTypes = {
  post: React.PropTypes.object.isRequired,
  postID: React.PropTypes.string.isRequired,
  refreshList: React.PropTypes.func.isRequired,
};

export default class Post extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
      localVotes: 0,
    };
    this.postURL = '';
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.removePost = this.removePost.bind(this);
    this.addVote = this.addVote.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount () {
    this.setState({
      localVotes: this.props.post.votes,
    });
    this.postURL = `https://feedforwardt2.firebaseio.com/posts/${this.props.postID}`;
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
    const newVote = this.props.post.votes + increment;
    const votesPath = `posts/${this.props.postID}/votes`;
    const votesRef = firebase.database().ref(votesPath);
    votesRef.set(newVote);
    this.setState({
      localVotes: newVote,
    });
  }

  handleVote (e) {
    const voteType = e.target.name;
    let voteValue = 0;
    if (voteType === 'upvote') {
      voteValue = 1;
    }
    else if (voteType === 'downvote') {
      voteValue = -1;
    }
    else {
      console.log('error');
    }
    this.addVote(voteValue);
  }

  render () {
    return (
      <div className='post'>
        <PostView post={this.props.post} removePost={this.removePost} inModal={false} />
        <p onClick={this.openModal}>Click to vote and comment</p>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false} >

          <button className='close-button' onClick={this.closeModal}>X</button>
          <div className='voting-display'>
            <button name='downvote' className='vote-button' onClick={this.handleVote}>
              -</button>
            <h2>{this.state.localVotes}</h2>
            <button name='upvote' className='vote-button' onClick={this.handleVote}>
              +</button>
          </div>
          <PostView post={this.props.post} inModal={true} />
          <CommentList postID={this.props.postID} post={this.props.post} />
        </Modal>
      </div>
    );
  }
}

Post.propTypes = propTypes;
