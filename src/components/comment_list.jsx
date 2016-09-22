children: Comment(s), NewCommentForm
state: comments default {}
requires pid string prop from PostViewModal OR Post
didMount: calls getComments
getComments: makes get request to db/posts/:pid; sets .comments=/:pid.comments
render: creates list; iterates over .comments and passes them as props to Comment components; if
  firebase.currentUser!=null, creates NewCommentForm at bottom
