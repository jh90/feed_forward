import React from 'react';
import firebase from '../../firebase.config.js';
import linkPreview from 'link-preview';

import RemoveButton from '../remove_button.jsx';

const propTypes = {
  post: React.PropTypes.object.isRequired,
  removePost: React.PropTypes.func,
  inModal: React.PropTypes.bool,
};

export default class PostView extends React.Component {
  constructor () {
    super();
    this.state = {
      isCurrentUser = false,
    };
  }

  componentDidMount () {
    if (this.props.post.poster-id === firebase.currentUser.uid) {
      this.setState({
        isCurrentUser = true,
      });
    }
  }

  render () {
    return (
      <div>
        <p>{this.props.post.text}</p>
        <div>{linkPreview.parse(this.props.post.link);}</div>
        {this.props.inModal ? false :
          <h3>`Posted by ${this.props.post.poster-alias} at ${this.props.post.timestamp}`</h3>}
        {this.state.isCurrentUser && !this.props.inModal ?
          <RemoveButton remove={this.props.removePost} /> : false}
      </div>
    );
  }
}

PostView.propTypes = propTypes;
