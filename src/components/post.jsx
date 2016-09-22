accepts post object, getPosts func props from Feed
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
