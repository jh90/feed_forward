nav links: signin/out, register, newpost, userlist, allposts
index view: allposts
goto alias: text input, on submit passes value to getIdByAlias, passes its return to redirect
  ^ separate component?
getIdByAlias: searches for uid matching alias passed as parameter
redirect: takes URL or keyword (?) and redirects appropriately - passed as prop to LoginForm and
  RegisterForm
