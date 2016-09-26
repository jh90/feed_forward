import React from 'react';
import request from 'superagent';

import Post from './post-handlers/post.jsx';

const propTypes = {
  params: React.PropTypes.object,
};

export default class Feed extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isMain: true,
      orderByVotes: false,
      posts: {},
    };
    this.getPosts = this.getPosts.bind(this);
    this.handleReordering = this.handleReordering.bind(this);
  }

  getPosts () {
    const url = 'https://feedforwardt2.firebaseio.com/posts.json';
    request.get(url).then((response) => {
      const postList = response.body;
      if (this.state.isMain) {
        this.setState({
         posts: postList,
        });
      }
      else {
        const $individualUserPosts = $.map(postList, (post) => {
          if (post.posterID === this.props.params.uid) {
            return post;
          }
        });
        this.setState({
          posts: $individualUserPosts,
        });
      }
    });
  }

  componentDidMount () {
    if (this.props.params.uid) {
      this.setState({
        isMain: false,
      });
    }
    this.getPosts();
  }

  sortByVotes (postArray) {
    postArray.sort(function(a,b) {
      return a.votes - b.votes;
    });
    return postArray;
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
    this.getPosts();
  }

  render () {
    return (
      <div>
        <button className='order-button' onClick={this.handleReordering}>
          {this.state.orderByVotes ? 'Most Recent' : 'Highest Voted'}
        </button>
        <div className='feed'>
          {
            $.map(this.state.posts, (post, id) => {
              return (
                <Post post={post} key={id} postID={id} refreshList={this.getPosts} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

Feed.propTypes = propTypes;
