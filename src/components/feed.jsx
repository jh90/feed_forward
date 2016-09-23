accepts but does not require uid string param from route
state defaults: .isMain true, .orderByVotes false, posts []
didMount: if params exist sets .isMain=false; calls getPosts
getPosts: if .isMain, gets all in database/posts, else gets all whose uid matches
  param; if .orderByVotes, sorts by votecount; sets .posts
render: creates list; iterates through .posts and passes them as props to PostDisplay components;
  creates button, onClick sets .orderByVotes=true and calls getPosts

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
    this.handleReordering = this.handleReordering.bind(this);
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
    });
    const postList = Array.from(allPosts);
    postList.reverse();
    return postList;
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
        if (post.uid === this.props.params.uid) {
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
