

##Technologies

React and React-Router, Firebase.io and superagent, JS/HTML/CSS, react-modal, link-preview

BONUS:
  goto alias: text input, on submit passes value to getIdByAlias, passes its return to redirect
  getIdByAlias: searches for uid matching alias passed as parameter

BONUS: allow comments to reply to other comments -
  state{inreplyto:[null]}
    => pass to NewCommentForm
      =>post via third hidden input, but also if!null display text indicating target
  CommentList.setReplyTarget(alias)
    => pass to Comment

<div>{linkPreview.parse(this.props.post.link)}</div>

}
      else {
        const individualUserPosts = [];
        postList.forEach((post) => {
          if (post.posterID === this.props.params.uid) {
            individualUserPosts.push(post);
          }
        });
        this.setState({
          posts: individualUserPosts,
        });
      }

      this.setState({
      timestamp: this.getTimestamp(),
    });
