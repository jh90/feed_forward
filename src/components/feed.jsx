import React from 'react';
import request from 'superagent';

import Post from './post.jsx';

const propTypes = {
  params: React.PropTypes.string,
};

export default class Feed extends React.Component {
  constructor () {
    super();
    this.state = {
      isMain: true,
      orderByVotes: false,
      posts: [],
    };
    this.handleListContent = this.handleListContent.bind(this);
  }

  componentDidMount () {
    if (this.props.params) {
      this.setState({
        isMain: false,
      });
    }
    this.handleListContent();
  }

  getPosts () {
    const url = 'https://feedforward-968b7.firebaseio.com/posts';
    const allPosts;
    request.get(url).then((response) => {
      allPosts = response.body;
      const postList = Array.from(allPosts);
      postList.reverse();
      return postList;
    });
  }

  sortByVotes (postArray) {
    postArray.sort(function(a,b) {
      return a.votes - b.votes;
    });
    return postArray;
  }

  handleListContent () {
    const postList = this.getPosts();
    if (this.state.orderByVotes) {
      postList = this.sortByVotes(postList);
    }

    if (this.state.isMain) {
      this.setState({
        posts: postList,
      });
    }
    else {
      const individualUserPosts = [];
      postList.forEach((post) => {
        if (post.poster-id === this.props.params.uid) {
          individualUserPosts.push(post);
        }
      });
      this.setState({
        posts: individualUserPosts,
      });
    }
  }

  handleReordering () {
    if (!this.state.orderByVotes) {
      this.setState({
        orderByVotes: true,
      });
    }
    else {
      this.setState({
        orderByVotes: false,
      });
    }
    this.handleListContent();
  }

  render () {
    return (
      <div>
        <button className='order-button' onClick={this.handleReordering}>
          {this.state.orderByVotes ? 'Highest Voted' : 'Most Recent'}
        </button>
        <div id='feed'>
          {
            this.state.posts.map((post) => {
              return (
                <Post post={post} refreshList={this.handleListContent} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

Feed.propTypes = propTypes;
