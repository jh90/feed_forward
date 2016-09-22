accepts but does not require uid string param from route
state defaults: .isMain true, .orderByVotes false, posts []
didMount: if params exist sets .isMain=false; calls getPosts
getPosts: if .isMain, gets all in database/posts, else gets all whose uid matches
  param; if .orderByVotes, sorts by votecount; sets .posts
render: creates list; iterates through .posts and passes them as props to PostDisplay components;
  creates button, onClick sets .orderByVotes=true and calls getPosts
