accepts getComments func prop from CommentList
state: commentText, submitterUID, timestamp
didMount: set state submitterUID = firebase.currentUser
renders text-input field (optional: second text-input field for comment header), submit button
onSubmit: captures text input; sets state commentText=input, timestamp=current time builtin func (?)
