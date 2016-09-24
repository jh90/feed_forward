dummy component
requires comment object, getComments func props from commentList
remove: sends delete request to firebase, calls props.getComments
render: displays: submitter alias, comment text, submit date (props); button, onClick calls remove
