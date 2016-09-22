accepts post object prop from feed
state.modalOpen default false
render: displays link [image/text/headline-?]; commentary if it exists; date of post; comment button;
  header, onClick calls modalOpen; if .props.uid == firebase.currentUser, button onClick calls
  removePost
modalOpen: sets modalOpen to true (triggers rerender)
modalClose: sets modalOpen to false, passed to PostViewModal as prop
removePost: makes delete request to /posts/pid
child component: PostViewModal
