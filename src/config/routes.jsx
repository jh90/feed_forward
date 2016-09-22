Route / Main
  IndexRoute FeedView
  Route users
    Route all UserList
    Route :id FeedView
  /Route
  Route login LoginForm
  Route register RegisterForm
/Route

==
feedforward.io/ MAIN
  [index] FEEDVIEW:ALL
  users/
    all USERLIST
    :id FEEDVIEW:UID
  login LOGINFORM
  register REGISTERFORM
