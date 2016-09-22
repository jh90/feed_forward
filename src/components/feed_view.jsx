state defaults: .isMain true, .orderByVotes false, posts []
didMount: if params exist sets .isMain=false; calls getPosts
getPosts: if .isMain, gets all posts from database, else gets all posts whose uid matches
  param; if .orderByVotes, sorts by votecount; sets state.posts
render: creates list; iterates through state.posts and passes them as props to PostDisplay components;
  creates button, onClick sets .orderByVotes=true and calls getPosts
