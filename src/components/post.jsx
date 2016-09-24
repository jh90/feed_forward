accepts post object, getPosts func props from Feed/UserList
state.modalOpen default false, localPostClone default props.post
render: displays link [image/text/headline-?]; commentary if it exists; date of post; comment button;
  header, onClick calls modalOpen; if .props.uid == firebase.currentUser, button onClick calls
  removePost; votecount; if currentUser!=(null || post.uid), upvote/downvote buttons, onClick call
  incrementVote(1 || -1)
openModal: sets modalOpen to true (triggers rerender)
closeModal: sets modalOpen to false, passed to PostViewModal as prop
removePost: makes delete request to /posts/pid
incrementVote: takes increment parameter, adds to props.post.votes, sends post to firebase, updates
  .localPostClone
child component: PostViewModal

import React from 'react';
import request from 'superagent';
import firebase from '../../firebase.config.js';
import LinkPreview from 'link-preview';

import PostViewModal from 'post_view_modal.jsx';

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

  render () {
    return (
      <div>
        <p>{this.props.post.text}</p>
        <
      </div>
    );
  }
}

Post.propTypes = propTypes;
