import React from 'react';
import firebase from '../../../firebase.config.js';
import LinkPreview from 'link-preview';

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
      isCurrentUser: false,
    };
  }

  componentDidMount () {
    if (firebase.auth().currentUser) {
      if (this.props.post.posterID === firebase.auth().currentUser.uid) {
        this.setState({
          isCurrentUser: true,
        });
      }
    }
  }

  render () {
    return (
      <div>
        <div>{linkPreview.parse(this.props.post.link)}</div>
        <p>{this.props.post.text}</p>
        { this.props.inModal
          ? false
          : <h3>Posted by {this.props.post.posterAlias} at {this.props.post.timestamp}</h3> }
        { this.state.isCurrentUser && !this.props.inModal
          ? <RemoveButton remove={this.props.removePost} />
          : false }
      </div>
    );
  }
}

PostView.propTypes = propTypes;
